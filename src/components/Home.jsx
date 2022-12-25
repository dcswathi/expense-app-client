import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { deleteExpense, startGetBudget, startGetExpenses, updateExpense } from '../actions';
import { startGetCategories } from '../actions/categoriesAction';
import AddOrEditExpense from './AddOrEditExpense';
import Table from './core/Table';
import PieChartGraph from './core/PieChartGraph'
import { PieChart } from '@mui/icons-material';

const ROWS_PER_PAGE = 5;

const getCategoryNamesAndAddToExpenses = (expenses, categories) => {
  const expensesCopy = cloneDeep(expenses);
  const categoriesHash = categories.reduce((acc, { _id, name, deletedAt }) => {
    acc[_id] = { name, deletedAt };
    return acc;
  }, []);
  console.log("getCategoryNamesAndAddToExpenses", categoriesHash, expensesCopy.filter(expense => !categoriesHash[expense.category].deletedAt));
  const expensesFiltered = expensesCopy.filter(expense => !categoriesHash[expense.category].deletedAt);
  expensesFiltered.forEach((expense) => {
    // eslint-disable-next-line no-param-reassign
    expense.categoryName = categoriesHash[expense.category].name;
  });
  return expensesFiltered;
};

const getExpensesForCategories = (expenses) => {
  const expensesForCategories = [];
  expenses.forEach((expense) => {
    if (expensesForCategories[expense.category] === undefined) {
      expensesForCategories[expense.category] = 0;
    }
    if (!expense.deletedAt) {
      expensesForCategories[expense.category] += expense.amount
    }
  });
  return expensesForCategories;
}

const getCategoriesToShow = (categories, expenses) => {
  const expensesForCategories = getExpensesForCategories(expenses);  
  return categories.map((category) => {
    const { _id, name } = category;
    return {
      id: _id,
      columns: [{
        id: 1,
        value: name
      }, {
        id: 2,
        value: expensesForCategories[_id] || 0
      }],
    };
  }).sort((a, b) => b.columns[1].value - a.columns[1].value);
};

const getCategoriesPieChart = (categories, expenses) => {
  const expensesForCategories = getExpensesForCategories(expenses);
  return categories.map((category) => {
    const { _id, name } = category;
    return [
      name,
      expensesForCategories[_id] || 0
    ]
  })
}

const calculatePercentage = (totalExpense, budget) => (totalExpense
  ? Math.floor((totalExpense / budget.amount) * 100)
  : 0);

const calculateExpenses = (categories, expenses) => {
  const categoriesHash = categories.reduce((acc, category) => {
    acc[category._id] = !!category.deletedAt;
    return acc;
  }, []);
  return expenses.reduce(
    (previousSum, currentExpense) => currentExpense.deletedAt || categoriesHash[currentExpense.category] ? previousSum: previousSum + currentExpense.amount, 
    0
  );
};

const expensesColumns = [{
  name: "Edit",
}, {
  name: "Category",
}, {
  name: "Item Name",
}, {
  name: "Amount",
}, {
  name: "Expense Date",
}, {
  name: "Delete / Undo",
}];

const categoriesColumns = [{
  name: "Category Name"
}, {
  name: "Expenses"
}]

const Home = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [expenseToEdit, setExpenseToEdit] = useState();
  const [expensesWithCategoryNames, setExpensesWithCategoryNames] = useState([]);
  const [expensesWithCategoryNamesFiltered, setExpensesWithCategoryNamesFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!show) {
      setExpenseToEdit(null);
    }
  }, [show]);

  useEffect(() => {
    setExpensesWithCategoryNamesFiltered(
      expensesWithCategoryNames.filter(
        (expense) => expense.title.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [expensesWithCategoryNames, searchText]);

  const budget = useSelector((state) => state.budget);
  const categories = useSelector((state) => state.categories);
  const expenses = useSelector((state) => state.expenses);

  useEffect(() => {
    setExpensesWithCategoryNames(getCategoryNamesAndAddToExpenses(expenses, categories));
  }, [expenses, categories]);

  useEffect(() => {
    setTotalExpense(calculateExpenses(categories, expenses));
    setPercentage(calculatePercentage(totalExpense, budget));
  }, [budget, expenses, totalExpense]);

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const expensesToShow = expensesWithCategoryNamesFiltered.map((expense) => {
    const { _id, categoryName, title, amount, expenseDate, deletedAt } = expense;
    const expenseDateFormatted = moment(expenseDate).format('Do MMM YYYY');
    return {
      id: _id,
      columns: [{
        id: 1,
        value: categoryName
      }, {
        id: 2,
        value: title
      }, {
        id: 3,
        value: amount
      }, {
        id: 4,
        value: expenseDateFormatted
      }],
      deleted: !!deletedAt,
      editHandler: () => {
        setExpenseToEdit(expense);
        setShow(true);
      },
      deleteHandler: () => {
        !!deletedAt
          ? dispatch(updateExpense({expense, deletedAt: null, id: expense._id}))
              .catch((err) => {
                console.log('deleteHandler updateExpense Err: ', err);
                alert("Undo failed!!!")
                // TODO: Show there was an error
              })
          : dispatch(deleteExpense({id: expense._id}))
              .catch((err) => {
                console.log('deleteHandler deleteExpense Err: ', err);
                alert("Delete failed!!!")
                // TODO: Show there was an error
              });
      }
    };
  });

  const categoriesActive = categories.filter(category => !category.deletedAt)
  const categoriesToShow = getCategoriesToShow(categoriesActive, expenses);
  const categoriesPieChart = getCategoriesPieChart(categoriesActive, expenses);

  return (
    <div className='home-container'>
      <AddOrEditExpense show={show} setShow={setShow} expense={expenseToEdit} />
      <div className="overview">
        <div className="budget-overview">
          <h2>Budget Overview</h2>
          <div className='budget-content'>
            <div className='budget-graph'>
              <CircularProgressbar value={totalExpense} text={`${percentage}%`} maxValue={budget.amount} />
            </div>
            <div className='budget-text'>
              <div>{`Total Budget - Rs.${budget.amount}`}</div>
              <div>{`Total Expenses - Rs.${totalExpense}`}</div>
            </div>
          </div>
        </div>

        <div className="category-overview">
          <h2>Category Splitwise Overview</h2>
          {categories.length > 5
            ? <Table rows={categoriesToShow} columns={categoriesColumns} rowsPerPage={ROWS_PER_PAGE} noFirstAndLastPageControls />
            : <PieChartGraph categoriesPieChart={categoriesPieChart} />}
        </div>
      </div>

      <div className='table-functions'>
        <div className="add-expense">
          <Button variant="primary" onClick={() => setShow(true)}>
            Add Expense
          </Button>
        </div>
        <div className="search-box">
          <form>
            <input type="text" placeholder="search" onChange={onSearchTextChange} />
          </form>
        </div>
      </div>
      <Table 
        rows={expensesToShow}
        columns={expensesColumns}
        rowsPerPage={ROWS_PER_PAGE}
        withEdit
        withDelete
      />
    </div>
  );
};

export default Home;

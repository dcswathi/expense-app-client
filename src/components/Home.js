import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'
import Button from 'react-bootstrap/Button'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useDispatch } from 'react-redux'
import { startGetBudget, startGetExpenses } from '../actions'
import { startGetCategories } from '../actions/categoriesAction'
import AddOrEditExpense from './AddOrEditExpense';

const getCategoryNamesAndAddToExpenses = (expenses, categories) => {
    const expensesCopy = cloneDeep(expenses);
    const categoriesHash = categories.reduce((acc, category) => {
        acc[category._id] = category.name;
        return acc;
    }, []);
    console.log(categoriesHash);
    expensesCopy.forEach((expense) => {
        expense.categoryName = categoriesHash[expense.category]
    });
    return expensesCopy;
};

const calculatePercentage = (totalExpense, budget) => {
    return totalExpense ? Math.floor((totalExpense/budget.amount) * 100) : 0;
}

const calculateExpenses = (expenses) => {
    let sum = 0
    expenses.forEach((ele) => {
        sum += ele.amount
    })
    return sum
}

const Home = () => {
    const [totalExpense, setTotalExpense] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [ expenseToEdit, setExpenseToEdit ] = useState();
    const [expensesWithCategoryNames, setExpensesWithCategoryNames] = useState([]);
    const [expensesWithCategoryNamesFiltered, setExpensesWithCategoryNamesFiltered] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!show) {
            setExpenseToEdit(null);
        }
    }, [show]);

    useEffect(() => {
        //invoke action creator
        dispatch(startGetBudget())
        dispatch(startGetExpenses())
        dispatch(startGetCategories())
    }, [dispatch])

    useEffect(() => {
        setExpensesWithCategoryNamesFiltered(expensesWithCategoryNames.filter((expense) => expense.title.toLowerCase().includes(searchText.toLowerCase())))
    }, [expensesWithCategoryNames, searchText]);
    
    const budget = useSelector((state) => state.budget)
    const categories = useSelector((state) => state.categories)
    const expenses = useSelector((state) => state.expenses)

    useEffect(() => {
        setExpensesWithCategoryNames(getCategoryNamesAndAddToExpenses(expenses, categories));
    }, [expenses, categories])
    
    useEffect(() => {
        setTotalExpense(calculateExpenses(expenses))
        setPercentage(calculatePercentage(totalExpense, budget))
    }, [ budget, expenses, totalExpense ])

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div>
            <AddOrEditExpense show={show} setShow={setShow} expense={expenseToEdit} />
            <div className='overview'>
                <div className='budget-overview'>
                    <h2>Budget Overview</h2>
                    <CircularProgressbar value={totalExpense} text={`${percentage}%`} maxValue={budget.amount} />
                
                    <div>{`Total Budget - ${budget.amount}`}</div>
                    <div>{`Total Expenses - ${totalExpense}`}</div>
                </div>

                <div className='category-overview'>
                    <h2>Category Splitwise Overview</h2>
                </div>  
            </div>

            <div>
                <div className='add-expense'>
                    <Button variant="primary" onClick={() => setShow(true)}>
                        Add Expense
                    </Button>
                </div>
                <div className='search-box'>
                    <form>
                        <input type="text" placeholder="search" onChange={onSearchTextChange} />
                    </form>
                </div>
            </div>
            <div className='category-table'>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>Category</th>
                            <th>Item Name</th>
                            <th>Amount</th>
                            <th>Expense Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expensesWithCategoryNamesFiltered.map((expense) => {
                                return (
                                    <tr key={expense._id}>
                                        <td><button onClick={() => {
                                            setExpenseToEdit(expense);
                                            setShow(true);
                                        }}>Edit</button></td>
                                        <td> {expense.categoryName} </td>
                                        <td> {expense.title} </td>
                                        <td> {expense.amount} </td>
                                        <td> {moment(expense.expenseDate).format('Do MMM YYYY')} </td>
                                    </tr>
                                )
                            })
                        }  
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home

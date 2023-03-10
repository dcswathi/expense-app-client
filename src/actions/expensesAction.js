import axios from 'axios';

const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  payload: expenses,
});

const postExpenseSuccess = (expense) => ({
  type: 'POST_EXPENSE',
  payload: expense,
});

const putExpenseSuccess = (expense) => ({
  type: 'PUT_EXPENSE',
  payload: expense,
});

export const startGetExpenses = () => (dispatch) => {
  // api call
  axios.get('http://localhost:3050/api/expenses', { headers: { Authorization: localStorage.getItem('token') } })
  // .then((response) => {
  //     if (response.statusText !== "OK") {
  //         throw new Error(response.data);
  //     }
  //     return response;
  // })
    .then((response) => {
      if (response) {
        const expenses = response.data;
        console.log('Expense response : ', expenses);
        // const expenses = calculateExpenses(data)
        dispatch(setExpenses(expenses));
      } else {
        throw new Error(response.data);
      }
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};

// const calculateExpenses = (data) => {
//     let sum = 0
//     data.forEach((ele) => {
//         sum += ele.amount
//     })
//     return sum
// }

export const saveExpense = (expenseData) => (dispatch) => axios.post('http://localhost:3050/api/expenses', expenseData, { headers: { Authorization: localStorage.getItem('token') } })
  .then((response) => {
    if (response) {
      const expense = response.data;
      console.log('Post Expense response : ', expense);
      dispatch(postExpenseSuccess(expense));
      return Promise.resolve(response);
    }
    throw new Error(response.data);
  })
  .catch((err) => {
    console.log('Err: ', err);
    throw new Error(err);
  });

export const updateExpense = (expenseData) => (dispatch) => axios.put(`http://localhost:3050/api/expenses/${expenseData.id}`, expenseData, { headers: { Authorization: localStorage.getItem('token') } })
  .then((response) => {
    if (response) {
      const expense = response.data;
      console.log('Put Expense response : ', expense);
      dispatch(putExpenseSuccess(expense));
      return Promise.resolve(response);
    }
    throw new Error(response.data);
  })
  .catch((err) => {
    console.log('Err: ', err);
    throw new Error(err);
  });

export const deleteExpense = (expenseData) => (dispatch) => axios.delete(`http://localhost:3050/api/expenses/${expenseData.id}`, { headers: { Authorization: localStorage.getItem('token') } })
  .then((response) => {
    if (response) {
      const expense = response.data;
      console.log('Delete Expense response : ', expense);
      dispatch(putExpenseSuccess(expense));
      return Promise.resolve(response);
    }
    throw new Error(response.data);
  })
  .catch((err) => {
    console.log('Err: ', err);
    throw new Error(err);
  });

import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { saveExpense, updateExpense } from '../actions/expensesAction';

function AddOrEditExpense({ show, setShow, expense, categories }) {
  const categoryId = expense?.category || '';
  const title = expense?.title || '';
  const amount = expense?.amount || '';
  const expenseDate = moment(expense?.expenseDate || new Date()).format('YYYY-MM-DD');

  console.log('AddOrEditExpense : ', expense, categoryId, expenseDate);

  const dispatch = useDispatch();

  const budget = useSelector((state) => state.budget);
  const expenses = useSelector((state) => state.expenses);

  const handleSubmit = (values) => {
    const expenseData = {
      category: values.category,
      title: values.title,
      amount: Number.parseInt(values.amount, 10),
      expenseDate: values.expenseDate,
    };

    const totalExpenses = expenses.reduce((previousSum, currentExpense) => previousSum + currentExpense.amount, 0);
    const expenseAmountToBeAdded = expense ? expenseData.amount - expense.amount : expenseData.amount;
    if (budget.amount < totalExpenses + expenseAmountToBeAdded) {
      alert("Budget exceeded, expense couldn't be added!");
      return;
    }

    console.log('formData', expenseData);
    dispatch(
      expense
        // eslint-disable-next-line no-underscore-dangle
        ? updateExpense({ ...expenseData, id: expense._id })
        : saveExpense(expenseData),
    )
      .then(() => {
        console.log('handleSubmit Then');
        setShow(false);
      })
      .catch((err) => {
        console.log('handleSubmit Err: ', err);
        // TODO: Show there was an error
      });
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        {
          expense
          ? <Modal.Title>Update Expense</Modal.Title>
          : <Modal.Title>Record your expense based on category</Modal.Title>
        }
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{
            category: categoryId,
            title,
            amount,
            expenseDate,
          }}
          validationSchema={Yup.object({
            category: Yup.string().required('category is required'),
            title: Yup.string().required('expense title is required'),
            amount: Yup.number()
              .typeError("Must be a number")
              .positive("Amount can't be negative")
              .required('Amount is required'),
            expenseDate: Yup.string().required('expenseDate is required'),
          })}
          onSubmit={handleSubmit}
        >
          <Form className='form-container'>
            <Field as="select" name="category" className='form-field' >
              <option value=""> Select Category</option>
              {
                categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {' '}
                    {category.name}
                  </option>
                ))
              }
            </Field>
            <ErrorMessage component="span" name="category" className="error-message" /> <br />

            <Field name="title" type="text" placeholder="Enter Expense name" className='form-field' /> 
            <ErrorMessage component="span" name="title" className="error-message" /> <br />

            <Field name="amount" type="text" placeholder="Enter Expense Amount" className='form-field' />
            <ErrorMessage component="span" name="amount" className="error-message" /> <br />

            <Field name="expenseDate" type="date" className='form-field' />
            <ErrorMessage component="span" name="expenseDate" className="error-message" /> <br />

            {
              expense
                ? <Button type="submit"> Update Expense </Button>
                : <Button type="submit"> Add Expense </Button>
            }
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </Form>
        </Formik>
      </Modal.Body>

      {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary">Add Expense</Button>
            </Modal.Footer> */}
    </Modal >
  );
}

export default AddOrEditExpense;

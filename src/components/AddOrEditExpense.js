import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { saveExpense, updateExpense } from '../actions/expensesAction'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import moment from 'moment';

function AddOrEditExpense({ show, setShow, expense }) {
    const categoryId = expense?.category || ''
    const title = expense?.title || ''
    const amount = expense?.amount || 0
    const expenseDate = moment(expense?.expenseDate|| new Date()).format('YYYY-MM-DD');

    console.log('AddOrEditExpense : ', expense, categoryId, expenseDate);

    const dispatch = useDispatch()

    const categories = useSelector((state) => {
        return state.categories
    });

    const handleSubmit = (values) => {
        const expenseData = {
            category: values.category,
            title: values.title,
            amount: values.amount,
            expenseDate: values.expenseDate
        }
        console.log('formData', expenseData)
        dispatch(expense ? updateExpense({...expenseData, id: expense._id}): saveExpense(expenseData))
            .then(() => {
                console.log('handleSubmit Then');
                setShow(false)
            })
            .catch((err) => {
                console.log('handleSubmit Err: ',err)
                // TODO: Show there was an error
            });
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Record your expense based on category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    initialValues={{ 
                        category: categoryId, 
                        title, 
                        amount, 
                        expenseDate}}
                    validationSchema={Yup.object({
                        category: Yup.string('category is required').required(),
                        title: Yup.string('expense title is required').required(),
                        amount: Yup.string('amount is required').required(),
                        expenseDate: Yup.string('expenseDate is required').required()
                    })}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Field as="select" name="category">
                            <option value="Select Category"> Select Category</option>
                            {
                                categories.map((category) => {
                                    return <option value={category._id} key={category._id}> {category.name}</option>
                                })
                            }
                        </Field> <br />
                        <ErrorMessage name="category" /><br />

                        <Field name="title" type="text"/> <br />
                        <ErrorMessage name="title" /><br />

                        <Field name="amount" type="text"/> <br />
                        <ErrorMessage name="amount" /><br />
                        
                        <Field name="expenseDate" type="date" /> <br />
                        <ErrorMessage name="expenseDate" /><br />

                        <Button type="submit"> Add Expense </Button>
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
        </Modal>
    );
}

export default AddOrEditExpense

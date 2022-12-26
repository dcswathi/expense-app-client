import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import {
    Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import Table from './core/Table';
import { startUpdateBudget } from '../actions/budgetAction'
import { startPostCategory, startUpdateCategory, startDeleteCategory } from '../actions/categoriesAction'

const categoriesColumns = [{
    name: "List of Categories",
}, {
    name: "",
}];

const Settings = (props) => {
    const dispatch = useDispatch()

    const budget = useSelector((state) => {
        return state.budget
    })

    const categories = useSelector((state) => {
        return state.categories
    })

    const categoriesToShow = categories.map((category) => {
        const { _id, name, deletedAt } = category;
        return {
            id: _id,
            columns: [{
                id: 1,
                value: name
            }],
            deleted: !!deletedAt,
            deleteHandler: () => {
                category.deletedAt
                    ? dispatch(startUpdateCategory({ ...category, deletedAt: null }))
                        .then(() => { }).catch((err) => {
                            console.log('deleteHandler updateCategory Err: ', err);
                            alert("Undo failed!!!")
                            // TODO: Show there was an error
                        })
                    : dispatch(startDeleteCategory(category))
                        .then(() => { }).catch((err) => {
                            console.log('deleteHandler deleteCategory Err: ', err);
                            alert("Delete failed!!!")
                            // TODO: Show there was an error
                        });
            }
        };
    });

    console.log("Settings", categories);

    const handleBudgetSubmit = (values) => {
        const budgetData = {
            amount: Number.parseInt(values.budget, 10)
        }
        dispatch(startUpdateBudget(budget._id, budgetData))
    }

    const handleCategorySubmit = (values) => {
        const categoryData = {
            name: values.category
        }
        console.log(categoryData)
        dispatch(startPostCategory(categoryData))
    }

    return (
        <div className='settings-container'>
            <div className='settings-forms'>
                <Formik
                    initialValues={{
                        budget: budget.amount
                    }}
                    validationSchema={Yup.object({
                        budget: Yup.number()
                        .typeError("Must be a number")
                        .positive("Amount can't be negative")
                        .required("Amount is required")
                    })}
                    onSubmit={handleBudgetSubmit}
                >
                    <Form className='form-grid'>
                        <div>
                            <label htmlFor="budget">{"Total Budget"}</label>
                        </div>
                        <div>
                            <Field name="budget"
                                type="text"
                                placeholder={budget.amount}
                                id="budget"
                            />
                            <div className='min-height'>
                                <ErrorMessage component="span" name="budget" className="error-message" />
                            </div>
                        </div>
                        <div>
                            <button type="submit"> Update </button>
                        </div>
                    </Form>
                </Formik>

                <Formik
                    initialValues={{
                        category: ""
                    }}
                    validationSchema={Yup.object({
                        category: Yup.string()
                        .required("Category is required")
                        .notOneOf(categories.map(category => category.name), "Category name already exists")
                    })}
                    onSubmit={handleCategorySubmit}
                >
                    <Form className='form-grid'>
                        <div>
                            <label htmlFor="category">Category</label>
                        </div>
                        <div>
                            <Field name="category"
                                type="text"
                                placeholder="Category name here"
                                id="category"
                            />
                            <ErrorMessage component="span" name="category" className="error-message" />
                        </div>
                        <div>
                            <button type="submit"> Add </button>
                        </div>
                    </Form>
                </Formik>
            </div>
            <Table
                rows={categoriesToShow}
                columns={categoriesColumns}
                rowsPerPage={10}
                withDelete
            />
        </div>

    )
}

export default Settings
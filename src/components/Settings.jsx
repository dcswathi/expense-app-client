import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from './core/Table';
import { startUpdateBudget } from '../actions/budgetAction'
import { startPostCategory, startUpdateCategory , startDeleteCategory } from '../actions/categoriesAction'

const categoriesColumns = [{
    name: "List of Categories",
  }, {
    name: "",
  }];

const Settings = (props) => {
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')

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
                ? dispatch(startUpdateCategory({...category, deletedAt: null}))
                    .then(() => {}).catch((err) => {
                        console.log('deleteHandler updateCategory Err: ', err);
                        alert("Undo failed!!!")
                        // TODO: Show there was an error
                    })
                : dispatch(startDeleteCategory(category))
                    .then(() => {}).catch((err) => {
                        console.log('deleteHandler deleteCategory Err: ', err);
                        alert("Delete failed!!!")
                        // TODO: Show there was an error
                    });
            }
        };
    });

    console.log("Settings", categories);

    const handleBudgetSubmit = (e) => {
        e.preventDefault()
        const budgetData = {
            amount: Number(amount)
        }
        dispatch(startUpdateBudget(budget._id, budgetData))
    }

    const handleCategorySubmit = (e) => {
        e.preventDefault()
        const categoryData = {
            name: category
        }
        console.log(categoryData)
        dispatch(startPostCategory(categoryData))
    }

    const handleChange = (e) => {
        const inputValue = e.target.name

        if (inputValue === "budget") {
            setAmount(e.target.value)
        } else if (inputValue === "category") {
            setCategory(e.target.value)
        }
    }

    return (
        <div className='settings-container'>
            <form onSubmit={handleBudgetSubmit}>
                <label htmlFor="budget">Total Budget</label>
                <input
                    type="text"
                    value={amount}
                    placeholder={budget.amount}
                    id="budget"
                    name="budget"
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Update"
                />
            </form>

            <form onSubmit={handleCategorySubmit}>
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    value={category}
                    placeholder="Category name here"
                    id="category"
                    name="category"
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Add"
                />
            </form>

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
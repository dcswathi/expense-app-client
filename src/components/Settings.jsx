import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startUpdateBudget } from '../actions/budgetAction'
import { startGetCategories , startPostCategories } from '../actions/categoriesAction'

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
        dispatch(startPostCategories(categoryData))
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
        <div>
            <form onSubmit={handleBudgetSubmit}>
                <label htmlFor="budget">Total Budget</label>
                <input
                    type="text"
                    // value={budget.amount ? budget.amount : amount} 
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

            <div>
                <p>Categories List</p>
                <ul>
                    {
                        categories.map((category) => {
                            return <li key={category._id}>
                                    {category.name}
                                    <button>Delete</button>
                                </li>
                        })
                    }
                </ul>
            </div>
        </div>

    )
}

export default Settings
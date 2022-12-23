import { createStore, combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import budgetReducer from '../reducers/budgetReducer'
import expensesReducer from '../reducers/expensesReducer'
import categoriesReducer from '../reducers/categoriesReducer'
import userReducer from '../reducers/userReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        budget: budgetReducer,
        expenses : expensesReducer,
        categories : categoriesReducer,
        user: userReducer
    }) , applyMiddleware(thunk))

    return store
}

export default configureStore

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import './index.css';

const store = configureStore()
// console.log('store', store)

console.log('state', store.getState())

store.subscribe(() =>{
  console.log('state updated', store.getState())
})

ReactDOM.render(<Provider store = {store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider> , document.getElementById('root'))

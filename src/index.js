import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import './index.css';

const store = configureStore();
// console.log('store', store)

console.log('state', store.getState());

store.subscribe(() => {
  console.log('state updated', store.getState());
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

import axios from 'axios';
import { parseJwt } from '../util';

const setUserSuccess = (user) => ({
  type: 'SET_USER',
  payload: user,
});

const putUserSuccess = (user) => ({
  type: 'PUT_USER',
  payload: user,
});

export const loginUser = (userData) => (dispatch) =>
  axios.post('http://localhost:3050/api/users/login', userData)
  .then((response) => {
    if (response && !response.data.hasOwnProperty('errors')) {
      localStorage.setItem('token', response.data.token);
      return Promise.resolve();
    } 
    if (response.data.hasOwnProperty('errors')) {
      throw new Error(response.data.errors);
    } else {
      throw new Error(response.data);
    }
  })
  .catch((err) => {
    console.log('Err: ', err);
    throw new Error(err);
  });

export const startGetUserAccount = () => (dispatch) =>
  axios
    .get(
      'http://localhost:3050/api/users/account/',
      { headers: { Authorization: localStorage.getItem('token') } } 
    )
    .then((response) => {
      if (response) {
        const user = response.data;
        console.log('User Get response : ', user);
        dispatch(setUserSuccess(user));
        return Promise.resolve();
      }
      throw new Error(response.data);
    })
    .catch((err) => {
      console.log('Err: ', err);
      throw new Error(err);
    });

export const startPutUserAccount = (userData) => (dispatch) =>
  axios
    .put(
      'http://localhost:3050/api/users/account/',
      userData,
      { headers: { Authorization: localStorage.getItem('token') } } 
    )
    .then((response) => {
      if (response) {
        const user = response.data;
        console.log('User Post response : ', user);
        dispatch(putUserSuccess(user));
        return Promise.resolve();
      }
      throw new Error(response.data);
    })
    .catch((err) => {
      console.log('Err: ', err);
      throw new Error(err);
    });

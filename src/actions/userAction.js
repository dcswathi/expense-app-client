import axios from 'axios'
import { parseJwt } from '../util'

export const saveUser = (userData) =>
  (dispatch) =>
      axios.post('http://localhost:3050/api/users/login', userData)
          .then((response) => {
              if(response && !response.data.hasOwnProperty('errors')){
                  const user = parseJwt(response.data.token?.slice(7))
                  console.log('User response : ', user)
                  localStorage.setItem('token', response.data.token)
                  dispatch(setUserSuccess(user))
                  return Promise.resolve();
              } else if (response.data.hasOwnProperty('errors')) {
                  throw new Error(response.data.errors)
              } else {
                  throw new Error(response.data)
              }   
          })
          .catch((err) => {
              console.log('Err: ',err)
              throw new Error(err);
          })


const setUserSuccess = (user) => {
  return {
      type : 'SET_USER',
      payload : user
  }
}
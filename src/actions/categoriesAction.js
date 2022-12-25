import axios from 'axios';

export const postCategory = (category) => ({
  type: 'POST_CATEGORY',
  payload: category,
});

export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  payload: categories,
});

export const updateCategory = (category) => ({
  type: 'UPDATE_CATEGORY',
  payload: category,
});

export const startGetCategories = () => (dispatch) => {
  return axios.get('http://localhost:3050/api/categories', { headers: { Authorization: localStorage.getItem('token') } })
    .then((response) => {
      if (response) {
        const categories = response.data;
        console.log('Categories Get response : ', categories);
        dispatch(setCategories(categories));
      } else {
        throw new Error(response.data);
      }
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};

export const startPostCategory = (categoryData) => (dispatch) => {
  return axios.post('http://localhost:3050/api/categories', categoryData, { headers: { Authorization: localStorage.getItem('token') } })
    .then((response) => {
      if (response) {
        const category = response.data;
        console.log('Category Post response : ', category);
        dispatch(postCategory(category));
      } else {
        throw new Error(response.data);
      }
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};

export const startUpdateCategory = (categoryData) => (dispatch) => {
  return axios.put(`http://localhost:3050/api/categories/${categoryData._id}`, categoryData, { headers: { Authorization: localStorage.getItem('token') } })
    .then((response) => {
      if (response) {
        const category = response.data;
        console.log('Category Update response : ', category);
        dispatch(updateCategory(category));
        return Promise.resolve();
      } else {
        throw new Error(response.data);
      }
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};

export const startDeleteCategory = (categoryData) => (dispatch) => {
  return axios.delete(`http://localhost:3050/api/categories/${categoryData._id}`, { headers: { Authorization: localStorage.getItem('token') } })
    .then((response) => {
      if (response) {
        const category = response.data;
        console.log('Category delete response : ', category);
        dispatch(updateCategory(category));
        return Promise.resolve();
      } else {
        throw new Error(response.data);
      }
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};

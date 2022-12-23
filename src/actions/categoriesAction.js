import axios from 'axios'

export const startGetCategories = () => {
    return (dispatch) => {
        axios.get('http://localhost:3050/api/categories', { headers: { Authorization: localStorage.getItem('token') } })
            .then((response) => {
                if(response){
                    const categories = response.data
                    console.log('Categories response : ', categories)
                    dispatch(setCategories(categories))
                } else {
                    throw new Error(response.data)
                }   
            })
            .catch((err) => {
                console.log('Err: ',err)
            })
    }
}

export const setCategories = (categories) => {
    return {
        type: 'SET_CATEGORIES',
        payload: categories
    }
}

export const startPostCategories = (categoryData) => {
    return (dispatch) => {
        axios.post('http://localhost:3050/api/categories', categoryData, { headers: { Authorization: localStorage.getItem('token') } })
            .then((response) => {
                if(response){
                    const category = response.data
                    console.log('Category response : ', category)
                    dispatch(postCategory(category))
                } else {
                    throw new Error(response.data)
                }   
            })
            .catch((err) => {
                console.log('Err: ',err)
            })
    }
}

export const postCategory = (category) => {
    return {
        type: 'POST_CATEGORY',
        payload: category
    }
}


// start or async to indicate an creator is making an api call / asynchronous operation

import axios from 'axios'

export const startGetBudget = () => {
    return (dispatch) => {
        //api call
        axios.get('http://localhost:3050/api/budget', { headers: { Authorization: localStorage.getItem('token') } })
            // .then ((response) => {
            //     if (response.statusText !== "OK") {
            //         throw new Error(response.data);
            //     }
            //     return response;
            // })
            .then((response) => {
                if(response){
                    const budget = response.data
                    // console.log('Budget response : ', budget)
                    dispatch(setBudget(budget))
                } else {
                    throw new Error(response.data)
                }   
            })
            .catch((err) => {
                console.log('Err: ',err)
            })
    }
}

export const startUpdateBudget = (id , budgetData) => {
    return (dispatch) => {
        //api call
        axios.put(`http://localhost:3050/api/budget/${id}`, budgetData, { headers: { Authorization: localStorage.getItem('token') } })
            .then((response) => {
                if(response){
                    const budget = response.data
                    console.log('Budget response : ', budget)
                    dispatch(setBudget(budget))
                } else {
                    throw new Error(response.data)
                }   
            })
            .catch((err) => {
                console.log('Err: ',err)
            })
    }
}


export const setBudget = (budget) => {
    return {
        type : 'SET_BUDGET',
        payload : budget
    }
}
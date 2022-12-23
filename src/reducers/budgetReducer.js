const budgetInitialState = {}

const budgetReducer = (state = budgetInitialState, action) => {
    switch(action.type) {
        case 'SET_BUDGET': {
            return action.payload
        }

        default : {
            return {...state}
        }
    }
}

export default budgetReducer
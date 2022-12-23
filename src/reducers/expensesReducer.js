const expensesInitialState = []

const expensesReducer = (state = expensesInitialState, action) => {
    switch(action.type) {
        case 'SET_EXPENSES': {
            return action.payload
        }

        case 'POST_EXPENSE' : {
            return [...state, {...action.payload}]
        }

        case 'PUT_EXPENSE' : {
            console.log(state, action.payload);
            return state.map((ele) => 
                ele._id === action.payload._id
                    ? {
                        ...ele , ...action.payload
                      } 
                    : {...ele}
            )
        }

        default : {
            return [...state]
        }
    }
}

export default expensesReducer
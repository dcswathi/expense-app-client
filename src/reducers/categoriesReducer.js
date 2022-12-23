const categoriesInitialState = []

const categoriesReducer = (state = categoriesInitialState , action) => {
    switch(action.type) {
        case 'SET_CATEGORIES' : {
            // return [...state, ...action.payload]
            return action.payload
        }
        case 'POST_CATEGORY' : {
            return [...state, {...action.payload}]
        }        
        default : {
            return [...state]
        }
    }
}

export default categoriesReducer

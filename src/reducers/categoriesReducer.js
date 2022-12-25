const categoriesInitialState = []

const categoriesReducer = (state = categoriesInitialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES': {
            // return [...state, ...action.payload]
            return action.payload
        }
        case 'POST_CATEGORY': {
            return [...state, { ...action.payload }]
        }
        case 'UPDATE_CATEGORY': {
            return state.map((ele) =>
                ele._id === action.payload._id
                    ? {
                        ...ele, ...action.payload
                    }
                    : { ...ele }
            )
        }
        default: {
            return [...state]
        }
    }
}

export default categoriesReducer

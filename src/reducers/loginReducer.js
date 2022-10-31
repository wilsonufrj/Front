const inicial_state = {
    username: "",
    loading: false,
    authenticated:false
}

const loginReducer = (state = inicial_state, action) => {
    switch (action.type) {
        case ('LOADING'):
            return {
                ...state,
                loading: true
            }
            
        case ('SUCCESS'):
            return {
                ...state,
                authenticated: action.data,
                loading: false
            }

        case ('FAILED'):
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default loginReducer
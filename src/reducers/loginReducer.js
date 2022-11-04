const inicial_state = {
    username: null,
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
                username:action.data.username,
                authenticated: true,
                loading: false
            }

        case ('FAILED'):
            return {
                ...state,
                loading: false
            }
        case ('LOGOUT'):
            return inicial_state

        default:
            return state
    }
}

export default loginReducer
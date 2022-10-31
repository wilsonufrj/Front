import api from "../services/api"
export const loadLogin = () => {
    return {
        type: "LOADING"
    }
}

export const successLogin = (data) => {
    return {
        type: "SUCCESS",
        data
    }
}

export const failedLogin = () => {
    return {
        type: 'FAILED'
    }
}

export const logout = () => {
    return {
        type: "LOGOUT",
        authenticated: false
    }
}

export const login = (data) => {
    return dispatch => {
        dispatch(loadLogin)
        api.post("users/login", data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(successLogin(response.data))
                }

                dispatch(failedLogin)
            })
            .catch(() => {
                dispatch(failedLogin)
            })
    }
}

export const addNewUser = (data) => {
        api.post("/users",data)
        return{
            type:"SUCCESS",
            data: false,
        }
}

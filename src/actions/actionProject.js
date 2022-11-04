import api from "../services/api"
export const load = () => {
    return {
        type: 'LOADING'
    }
}

const projectCreated = (data) => {
    return {
        type: 'CREATED',
        data
    }
}

const successGetProject = (data)=>{
    return{
        type:'SUCCESS-PROJECT',
        data
    }
}


export const getProjects = (username) => {
    return dispatch => {
        dispatch(load)
        api.get('/projects',
            {
                headers: {
                    'username': username
                }
            }
        )
            .then((response) => {
                dispatch(successGetProject(response.data))
            })
    }
}

export const createProject = (username, data) => {

    return dispatch => {
        api.post(`/projects`, data, {
            headers: {
                'username': `${username}`
            }
        })
            .then(response => {
                dispatch(projectCreated(response.data))
            })
    }
}


export const getInfoProject = (id)=>{
    return dispatch =>{
        dispatch(load)
        api.get(`/projects/${id}`)
        .then(response=>{
            console.log(response.data)
        })
    }   
}
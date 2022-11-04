const inicial_state = {
    listProject:[],
    loading:false
}

const projectReducer = (state = inicial_state, action) => {
    switch (action.type) {
        case ('LOADING'):
            return {
                ...state,
                loading: true
            }
            
        case ('SUCCESS-PROJECT'):
            return {
                ...state,
                listProject: [...action.data],
                loading: false
            }
        
        case ('CREATED'):
            return{
                ...state,
                listProject:[...state.listProject,action.data],
                loading:false
            }
        
        default:
            return state
    }
}

export default projectReducer

import {applyMiddleware, combineReducers,createStore} from 'redux'
import loginReducer from '../reducers/loginReducer.js';
import  thunk  from 'redux-thunk'


const rootReducer = combineReducers({
    loginReducer,
})

export const store = createStore(rootReducer,applyMiddleware(thunk));
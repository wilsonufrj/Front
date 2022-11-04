import {applyMiddleware, combineReducers,createStore} from 'redux'
import loginReducer from '../reducers/loginReducer.js';
import projectReducer from '../reducers/projectReducer.js';

import  thunk  from 'redux-thunk'


const rootReducer = combineReducers({
    loginReducer,
    projectReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk));
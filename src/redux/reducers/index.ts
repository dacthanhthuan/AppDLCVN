import {combineReducers} from 'redux';
import AppReducer from './appReducer';
import UserReducer from './userReducer';

const rootReducer = combineReducers({AppReducer, UserReducer});

export default rootReducer;

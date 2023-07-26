import {combineReducers} from 'redux';
import AppReducer from './appReducer';
import UserReducer from './userReducer';
import ProductListReducer from './productListReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  product: ProductListReducer,
});

export default rootReducer;

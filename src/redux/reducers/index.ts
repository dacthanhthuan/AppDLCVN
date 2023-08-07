import {combineReducers} from 'redux';
import AppReducer from './appReducer';
import UserReducer from './userReducer';
import ProductListReducer from './productListReducer';
import ChangePointListReducer from './changePointListReducer';
import CartReducer from './cartReducer';
import searchRecentReducer from './searchRecentReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  product: ProductListReducer,
  changePoint: ChangePointListReducer,
  cart: CartReducer,
  search: searchRecentReducer,
});

export default rootReducer;

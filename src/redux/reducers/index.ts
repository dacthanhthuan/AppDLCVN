import {combineReducers} from 'redux';
import AppReducer from './appReducer';
import UserReducer from './userReducer';
import ProductListReducer from './productListReducer';
import ChangePointListReducer from './changePointListReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  product: ProductListReducer,
  changePoint: ChangePointListReducer,
});

export default rootReducer;

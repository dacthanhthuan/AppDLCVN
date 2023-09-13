import {combineReducers} from 'redux';
import AppReducer from './appReducer';
import UserReducer from './userReducer';
import ProductListReducer from './productListReducer';
import ChangePointListReducer from './changePointListReducer';
import CartReducer from './cartReducer';
import searchRecentReducer from './searchRecentReducer';
import addressBookReducer from './addressBookReducer';
import locationReducer from './locationReducer';
import orderReducer from './orderReducer';
import ErrorHandlerReducer from './errorReducer';
import supplierReducer from './supplierReducer';
import walletReducer from './walletReducer';
import DetailMemberReducer from './detailMemberReducer';
import ReferralInfoReducer from './referralInfoRecuder';
import ReferralMemberReducer from './referralMemberReducer';
import reportCEOReducer from './reportCEOReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  product: ProductListReducer,
  changePoint: ChangePointListReducer,
  cart: CartReducer,
  search: searchRecentReducer,
  addressBook: addressBookReducer,
  location: locationReducer,
  order: orderReducer,
  error: ErrorHandlerReducer,
  supplier: supplierReducer,
  wallet: walletReducer,
  detailMember: DetailMemberReducer,
  referral: ReferralInfoReducer,
  referralMember: ReferralMemberReducer,
  reportCEO: reportCEOReducer,
});

export default rootReducer;

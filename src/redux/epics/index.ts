import {combineEpics} from 'redux-observable';
import initialApiEpic from './initialApiEpic';
import registerEpic from './registerEpic';
import loginEpic from './loginEpic';
import productListEpic from './productListEpic';
import addressBookEpic from './addressBookEpic';
import locationEpic from './locationEpic';
import getDetailEpic from './getDetailEpic';
import orderEpic from './orderEpic';
import supplierEpic from './supplierEpic';
import walletEpic from './walletEpic';
import detailMemberEpic from './detailMemberEpic';
import referralInfoEpic from './referralInfoEpic';
import referralMemberEpic from './referralMemberEpic';
import reportCEOEpic from './reportCeoEpic';

const rootEpic = combineEpics(
  initialApiEpic,
  registerEpic,
  loginEpic,
  productListEpic,
  addressBookEpic,
  locationEpic,
  getDetailEpic,
  orderEpic,
  supplierEpic,
  walletEpic,
  detailMemberEpic,
  referralInfoEpic,
  referralMemberEpic,
  reportCEOEpic,
);

export default rootEpic;

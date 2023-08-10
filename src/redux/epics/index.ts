import {combineEpics} from 'redux-observable';
import initialApiEpic from './initialApiEpic';
import registerEpic from './registerEpic';
import loginEpic from './loginEpic';
import productListEpic from './productListEpic';
import addressBookEpic from './addressBookEpic';
import locationEpic from './locationEpic';
import getDetailEpic from './getDetailEpic';
import orderEpic from './orderEpic';

const rootEpic = combineEpics(
  initialApiEpic,
  registerEpic,
  loginEpic,
  productListEpic,
  addressBookEpic,
  locationEpic,
  getDetailEpic,
  orderEpic,
);

export default rootEpic;

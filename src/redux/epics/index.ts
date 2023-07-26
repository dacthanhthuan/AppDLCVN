import {combineEpics} from 'redux-observable';
import initialApiEpic from './initialApiEpic';
import registerEpic from './registerEpic';
import loginEpic from './loginEpic';
import productListEpic from './productListEpic';

const rootEpic = combineEpics(
  initialApiEpic,
  registerEpic,
  loginEpic,
  productListEpic,
);

export default rootEpic;

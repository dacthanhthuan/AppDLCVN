import {combineEpics} from 'redux-observable';
import initialApiEpic from './initialApiEpic';
import registerEpic from './registerEpic';
import loginEpic from './loginEpic';

const rootEpic = combineEpics(initialApiEpic, registerEpic, loginEpic);

export default rootEpic;

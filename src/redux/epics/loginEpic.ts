import {switchMap} from 'rxjs';
import axios from 'axios';
import {Epic, ofType} from 'redux-observable';
import {LOGIN} from '../actions/types';
import {clientLoginEnd, clientLoginFail} from '../actions/userActions';
import api_login from '../../api/api_login';

const loginEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LOGIN.START),
    switchMap(async action => {
      return await api_login(action.payload)
        .then(res => clientLoginEnd(res))
        .catch(err => clientLoginFail(err));
    }),
  );

export default loginEpic;

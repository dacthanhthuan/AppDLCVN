import {switchMap} from 'rxjs';
import axios from 'axios';
import {Epic, ofType} from 'redux-observable';
import {CLIENT_LOGIN_START} from '../actions/types';
import {clientLoginEnd, clientLoginFail} from '../actions/clientLogin';

const loginEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CLIENT_LOGIN_START),
    switchMap(async action => {
      return await axios
        .post(
          `${action.domain}client_init/login?apikey=${action.api}`,
          action.payload,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(res => {
          if (res.data.status === 200) return clientLoginEnd(res.data.data);
          else return clientLoginFail(res.data.data);
        });
    }),
  );

export default loginEpic;

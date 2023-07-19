import {switchMap} from 'rxjs';
import axios from 'axios';
import {Epic, ofType} from 'redux-observable';
import {LOGIN} from '../actions/types';
import {clientLoginEnd, clientLoginFail} from '../actions/userActions';

const loginEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LOGIN.START),
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
          else return clientLoginFail(res.data);
        });
    }),
  );

export default loginEpic;

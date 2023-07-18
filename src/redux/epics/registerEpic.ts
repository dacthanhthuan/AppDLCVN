import {mergeMap} from 'rxjs';
import axios from 'axios';
import {Epic, ofType} from 'redux-observable';
import {CLIENT_REGISTER_START} from '../actions/types';
import {clientRegisterEnd, clientRegisterFail} from '../actions/clientRegister';

const registerEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CLIENT_REGISTER_START),
    mergeMap(async action => {
      return await axios
        .post(
          `${action.domain}client_init/register?apikey=${action.api}`,
          action.payload,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(res => {
          if (res.data.status === 200) return clientRegisterEnd(res.data.data);
          else return clientRegisterFail(res.data.data);
        });
    }),
  );

export default registerEpic;

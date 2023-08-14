import {mergeMap} from 'rxjs';
import axios from 'axios';
import {Epic, ofType} from 'redux-observable';
import {REGISTER} from '../actions/types';
import {clientRegisterEnd, clientRegisterFail} from '../actions/userActions';
import api_register from '../../api/api_register';
import {riseNetworkError} from '../actions/errorHandlerActions';

const registerEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(REGISTER.START),
    mergeMap(async action => {
      return await api_register(action.payload)
        .then(res => {
          return clientRegisterEnd(res);
        })
        .catch(err => {
          if (err instanceof Error) {
            return riseNetworkError({
              error: err,
              visible: true,
            });
          }

          return clientRegisterFail(err);
        });
    }),
  );

export default registerEpic;

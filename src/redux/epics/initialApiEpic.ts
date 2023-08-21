import {mergeMap, switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {INITIAL} from '../actions/types';
import {clientInitialApiEnd, clientInitialApiFail} from '../actions/appActions';
import api_initial_client from '../../api/api_initial_client';
import {riseNetworkError} from '../actions/errorHandlerActions';

const initialApiEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(INITIAL.START),
    switchMap(async action => {
      return await api_initial_client(action.payload)
        .then(res => clientInitialApiEnd(res))
        .catch(err => {
          if (err instanceof Error) {
            return riseNetworkError({
              error: err,
              visible: true,
            });
          }
          return clientInitialApiFail(err);
        });
    }),
  );

export default initialApiEpic;

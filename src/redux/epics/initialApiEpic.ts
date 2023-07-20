import {mergeMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {INITIAL} from '../actions/types';
import {clientInitialApiEnd, clientInitialApiFail} from '../actions/appActions';
import api_initial_client from '../../api/api_initial_client';

const initialApiEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(INITIAL.START),
    mergeMap(async action => {
      return await api_initial_client(action.payload)
        .then(res => clientInitialApiEnd(res))
        .catch(err => clientInitialApiFail(err));
    }),
  );

export default initialApiEpic;

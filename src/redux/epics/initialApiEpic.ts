import {mergeMap} from 'rxjs';
import axios from 'axios';
import {Epic, ofType} from 'redux-observable';
import {CLIENT_INITIAL_START} from '../actions/types';
import {clientInitialApiEnd} from '../actions/clientInitialAPI';
import {REDUX_URI} from '../../global';

const initialApiEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CLIENT_INITIAL_START),
    mergeMap(async action => {
      return await axios
        .post(REDUX_URI, action.payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          return clientInitialApiEnd(res.data.data);
        });
    }),
  );

export default initialApiEpic;

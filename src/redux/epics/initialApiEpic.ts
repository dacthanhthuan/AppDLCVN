import {mergeMap} from 'rxjs';
import axios from 'axios';
import {Epic, ofType} from 'redux-observable';
import {INITIAL} from '../actions/types';
import {clientInitialApiEnd, clientInitialApiFail} from '../actions/appActions';
import {REDUX_URI} from '../../global';

const initialApiEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(INITIAL.START),
    mergeMap(async action => {
      return await axios
        .post(REDUX_URI, action.payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          if (res.data.status === 200)
            return clientInitialApiEnd(res.data.data);
          else return clientInitialApiFail(res.data);
        });
    }),
  );

export default initialApiEpic;

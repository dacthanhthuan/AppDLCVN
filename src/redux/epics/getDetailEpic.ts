import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {GET_DETAIL} from '../actions/types';
import api_get_detail_user from '../../api/api_get_detail_user';
import {clientLoginEnd, clientLoginFail} from '../actions/userActions';

const getDetailEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(GET_DETAIL.USER),
    switchMap(async action => {
      return await api_get_detail_user(action.payload)
        .then(res => clientLoginEnd(res))
        .catch(msg => clientLoginFail(msg));
    }),
  );

export default getDetailEpic;

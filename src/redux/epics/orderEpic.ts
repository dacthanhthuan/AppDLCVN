import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {ORDER} from '../actions/types';
import api_new_order from '../../api/api_new_order';
import {newOrderEnd, newOrderFail} from '../actions/orderActions';

const orderEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(ORDER.NEW_ORDER_START),
    switchMap(async action => {
      switch (action.type) {
        case ORDER.NEW_ORDER_START: {
          return await api_new_order(action.payload)
            .then(res => newOrderEnd(res))
            .catch(msg => newOrderFail(msg));
        }
      }
    }),
  );

export default orderEpic;

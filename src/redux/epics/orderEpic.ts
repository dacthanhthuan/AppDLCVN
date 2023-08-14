import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {ORDER} from '../actions/types';
import api_new_order from '../../api/api_new_order';
import {
  getListOrderEnd,
  getListOrderFail,
  newOrderEnd,
  newOrderFail,
} from '../actions/orderActions';
import api_get_order_list_all from '../../api/api_get_order_list_all';
import {riseNetworkError} from '../actions/errorHandlerActions';

const orderEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(ORDER.NEW_ORDER_START, ORDER.LIST_ORDER_START),
    switchMap(async action => {
      switch (action.type) {
        case ORDER.NEW_ORDER_START: {
          return await api_new_order(action.payload)
            .then(res => newOrderEnd(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return newOrderFail(msg);
            });
        }
        case ORDER.LIST_ORDER_START: {
          return await api_get_order_list_all(action.payload)
            .then(res => getListOrderEnd(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return getListOrderFail(msg);
            });
        }
      }
    }),
  );

export default orderEpic;

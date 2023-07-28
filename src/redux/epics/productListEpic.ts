import {Epic, ofType} from 'redux-observable';
import {CHANGE_POINT_LIST, PRODUCT_LIST} from '../actions/types';
import {switchMap} from 'rxjs';
import {
  clientProductListEnd,
  clientProductListFail,
} from '../actions/productListActions';
import api_product_list from '../../api/api_product_list';

const productListEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType<any, PRODUCT_LIST | CHANGE_POINT_LIST, any>(
      PRODUCT_LIST.START,
      CHANGE_POINT_LIST.START,
    ),
    switchMap(async action => {
      return await api_product_list(action.payload)
        .then(res => clientProductListEnd(res, action.type))
        .catch(err => clientProductListFail(err, action.type));
    }),
  );

export default productListEpic;

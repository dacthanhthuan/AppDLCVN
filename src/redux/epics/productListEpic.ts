import {Epic, ofType} from 'redux-observable';
import {PRODUCT_LIST} from '../actions/types';
import {switchMap} from 'rxjs';
import {
  clientProductListEnd,
  clientProductListFail,
} from '../actions/productListActions';
import api_product_list from '../../api/api_product_list';

const productListEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(PRODUCT_LIST.START),
    switchMap(async action => {
      return await api_product_list(action.payload)
        .then(res => clientProductListEnd(res))
        .catch(err => clientProductListFail(err));
    }),
  );

export default productListEpic;

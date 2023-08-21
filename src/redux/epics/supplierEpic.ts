import {mergeMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {SUPPLIER} from '../actions/types';
import {
  SupplierListActions,
  SupplierProductListActions,
} from '../actions/supplierActions';
import {riseNetworkError} from '../actions/errorHandlerActions';
import api_supplier_list from '../../api/api_supplier_list';
import api_supplier_list_product from '../../api/api_supplier_list_product';

const supplierEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SUPPLIER.LIST_SUPPLIER_START, SUPPLIER.LIST_PRODUCT_SUPPLIER_START),
    mergeMap(async action => {
      switch (action.type) {
        case SUPPLIER.LIST_SUPPLIER_START: {
          return await api_supplier_list(action.payload)
            .then(res => SupplierListActions.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return SupplierListActions.fail(msg);
            });
        }

        case SUPPLIER.LIST_PRODUCT_SUPPLIER_START: {
          return await api_supplier_list_product(action.payload)
            .then(res => SupplierProductListActions.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return SupplierProductListActions.fail(msg);
            });
        }
      }
    }),
  );

export default supplierEpic;

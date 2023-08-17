import {SUPPLIER} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  message: undefined,
  supplierLoading: false,
  supplier: [],
  supplier_total_record: 0,
  supplier_current_record: 0,
  supplier_next_page: 1,
  productLoading: false,
  product: [],
  product_total_record: 0,
  product_current_record: 0,
  product_next_page: 1,
};

export default function supplierReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    // supplier list
    case SUPPLIER.LIST_SUPPLIER_START: {
      return {
        ...state,
        supplierLoading: true,
        message: undefined,
      };
    }
    case SUPPLIER.LIST_SUPPLIER_END: {
      return {
        ...state,
        supplier: [...state.supplier, ...action.payload.l],
        supplierLoading: false,
        message: undefined,
        supplier_total_record: action.payload.total_record,
        supplier_current_record:
          state.supplier_current_record + action.payload.l.length,
        supplier_next_page: state.supplier_next_page + 1,
      };
    }
    case SUPPLIER.LIST_SUPPLIER_FAIL: {
      return {
        ...state,
        supplierLoading: false,
        message: action.payload,
      };
    }
    case SUPPLIER.LIST_SUPPLIER_CLEAR: {
      return {
        ...state,
        supplierLoading: false,
        message: undefined,
        supplier: [],
        supplier_total_record: 0,
        supplier_current_record: 0,
        supplier_next_page: 1,
      };
    }

    // supplier product list
    case SUPPLIER.LIST_PRODUCT_SUPPLIER_START: {
      return {
        ...state,
        productLoading: true,
        message: undefined,
      };
    }
    case SUPPLIER.LIST_PRODUCT_SUPPLIER_END: {
      return {
        ...state,
        productLoading: false,
        message: undefined,
        product: [...state.product, ...action.payload.l],
        product_total_record: action.payload.total_record,
        product_current_record:
          state.product_current_record + action.payload.l.length,
        product_next_page: state.product_next_page + 1,
      };
    }
    case SUPPLIER.LIST_PRODUCT_SUPPLIER_FAIL: {
      return {
        ...state,
        productLoading: false,
        message: action.payload,
      };
    }
    case SUPPLIER.LIST_PRODUCT_SUPPLIER_CLEAR: {
      return {
        ...state,
        productLoading: false,
        message: undefined,
        product: [],
        product_total_record: 0,
        product_current_record: 0,
        product_next_page: 1,
      };
    }

    default:
      return state;
  }
}

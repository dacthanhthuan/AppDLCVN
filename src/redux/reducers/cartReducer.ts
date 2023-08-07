import {storeData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';
import {CART} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  data: [],
};

export default function CartReducer(state = initialState, action: AnyAction) {
  const going_product = action.payload?.product;
  const going_type = action.payload?.pType;
  const going_quantity = action.payload?.quantity;
  const going_product_id = action.payload?.productId;
  let filterData;
  switch (action.type) {
    // merge data from local
    case CART.MERGE:
      return {
        ...state,
        data: [...action.payload],
      };

    // case add product
    case CART.ADD:
      //   check product is exist in data or not?
      let isExist = false;
      filterData = state.data.map((item: any) => {
        if (
          item?.product?.product_id == going_product.product_id &&
          item?.pType === going_type
        ) {
          item.quantity += going_quantity;
          isExist = true;
        }
        return item;
      });

      //   if not exist
      if (!isExist) {
        filterData = [...filterData, action.payload];
      }

      // store datat to local
      storeData(LOCALSTORAGE.cart, {
        data: filterData,
      });

      return {
        ...state,
        data: [...filterData],
      };

    // case remove product
    case CART.REMOVE:
      // filter data
      filterData = state.data.filter((item: any) => {
        if (
          item?.product?.product_id != going_product_id ||
          (item?.pType !== going_type &&
            item?.product?.product_id == going_product_id)
        ) {
          return true;
        }
      });

      // store datat to local
      storeData(LOCALSTORAGE.cart, {
        data: filterData,
      });

      return {
        ...state,
        data: [...filterData],
      };

    // case change quantity product
    case CART.CHANGE_QTY:
      // filter data
      filterData = state.data.map((item: any) => {
        // if product id == going_product id
        if (
          item?.product?.product_id == going_product_id &&
          item?.pType === going_type
        ) {
          item.quantity = going_quantity;
        }
        // return item
        return item;
      });

      // store datat to local
      storeData(LOCALSTORAGE.cart, {
        data: filterData,
      });

      return {
        ...state,
        data: [...filterData],
      };

    case CART.REMOVE_ALL:
      return initialState;

    // not in cases above
    default:
      return state;
  }
}

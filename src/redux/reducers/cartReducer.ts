import {storeData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';
import {CART} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  data: [],
  total_quantity: 0,
};

export default function CartReducer(state = initialState, action: AnyAction) {
  const going_product = action.payload?.product;
  const going_type = action.payload?.pType;
  const going_quantity = action.payload?.quantity;
  const going_product_id = action.payload?.productId;
  let filterData;
  let calculate_quantity = state.total_quantity;
  switch (action.type) {
    // merge data from local
    case CART.MERGE:
      calculate_quantity = 0;
      action?.payload?.map(
        (item: any) => (calculate_quantity += item.quantity),
      );
      return {
        ...state,
        data: [...action.payload],
        total_quantity: calculate_quantity,
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

      // change calculate quantity
      calculate_quantity += going_quantity;

      // store datat to local
      storeData(LOCALSTORAGE.cart, {
        data: filterData,
      });

      return {
        ...state,
        data: [...filterData],
        total_quantity: calculate_quantity,
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
        } else {
          calculate_quantity -= item.quantity;
        }
      });

      // store datat to local
      storeData(LOCALSTORAGE.cart, {
        data: filterData,
      });

      return {
        ...state,
        data: [...filterData],
        total_quantity: calculate_quantity,
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
          calculate_quantity -= item.quantity;
          calculate_quantity += going_quantity;
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
        total_quantity: calculate_quantity,
      };

    case CART.REMOVE_ALL:
      return initialState;

    // not in cases above
    default:
      return state;
  }
}

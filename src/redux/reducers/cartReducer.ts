import {getData, storeData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';
import {CART} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  wallet: [],
  point: [],
};

export default function CartReducer(state = initialState, action: AnyAction) {
  const going_product = action.payload?.product;
  const going_type = action.payload?.pType;
  const going_quantity = action.payload?.quantity;
  const going_product_id = action.payload?.productId;
  let filterData: any[] = [];
  switch (action.type) {
    // merge data from local
    case CART.MERGE:
      return {
        ...state,
        ...action.payload,
      };

    // case add product
    case CART.ADD:
      // check type product, if this is money
      if (going_type === 'money') {
        //   check product is exist in data or not?
        let isExist = false;
        filterData = state.wallet.map((item: any) => {
          if (item?.product?.product_id == going_product.product_id) {
            item.quantity += going_quantity;
            isExist = true;
          }
          return item;
        });

        //   if not exist
        if (!isExist) {
          filterData = [...filterData, action.payload];
        }
      } else {
        // otherwise, type product is point
        //   check product is exist in data or not?
        let isExist = false;
        filterData = state.point.map((item: any) => {
          if (item?.product?.product_id == going_product.product_id) {
            item.quantity += going_quantity;
            isExist = true;
          }
          return item;
        });

        //   if not exist
        if (!isExist) {
          filterData = [...filterData, action.payload];
        }
      }

      // store local data
      getData(LOCALSTORAGE.cart, (err, res) => {
        let data = JSON.parse(res!);
        if (going_type == 'money') {
          storeData(LOCALSTORAGE.cart, {
            wallet: filterData,
            point: data?.point,
          });
        } else {
          storeData(LOCALSTORAGE.cart, {
            wallet: data?.wallet,
            point: filterData,
          });
        }
      });

      return {
        ...state,
        wallet: going_type == 'money' ? filterData : state.wallet,
        point: going_type == 'point' ? filterData : state.point,
      };

    // case remove product
    case CART.REMOVE:
      // filter data
      if (going_type == 'money') {
        filterData = state.wallet.filter((item: any) => {
          if (item?.product?.product_id != going_product_id) {
            return true;
          }
        });
      } else {
        filterData = state.point.filter((item: any) => {
          if (item?.product?.product_id != going_product_id) {
            return true;
          }
        });
      }

      // store local data
      getData(LOCALSTORAGE.cart, (err, res) => {
        let data = JSON.parse(res!);
        if (going_type == 'money') {
          storeData(LOCALSTORAGE.cart, {
            wallet: filterData,
            point: data?.point,
          });
        } else {
          storeData(LOCALSTORAGE.cart, {
            wallet: data?.wallet,
            point: filterData,
          });
        }
      });

      return {
        ...state,
        wallet: going_type == 'money' ? filterData : state.wallet,
        point: going_type == 'point' ? filterData : state.point,
      };

    // case change quantity product
    case CART.CHANGE_QTY:
      // checking product type:
      if (going_type == 'money') {
        // filter data
        filterData = state.wallet.map((item: any) => {
          // if product id == going_product id
          if (item?.product?.product_id == going_product_id) {
            item.quantity = going_quantity;
          }
          // return item
          return item;
        });
      } else {
        // filter data
        filterData = state.point.map((item: any) => {
          // if product id == going_product id
          if (item?.product?.product_id == going_product_id) {
            item.quantity = going_quantity;
          }
          // return item
          return item;
        });
      }

      // store local data
      getData(LOCALSTORAGE.cart, (err, res) => {
        let data = JSON.parse(res!);
        if (going_type == 'money') {
          storeData(LOCALSTORAGE.cart, {
            wallet: filterData,
            point: data?.point,
          });
        } else {
          storeData(LOCALSTORAGE.cart, {
            wallet: data?.wallet,
            point: filterData,
          });
        }
      });

      return {
        ...state,
        wallet: going_type == 'money' ? filterData : state.wallet,
        point: going_type == 'point' ? filterData : state.point,
      };

    case CART.REMOVE_ALL:
      return initialState;

    // not in cases above
    default:
      return state;
  }
}

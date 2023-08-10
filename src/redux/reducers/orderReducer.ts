import {ORDER} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  data: [],
  newOrderState: false,
  message: undefined,
};

export default function orderReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    // new order
    case ORDER.NEW_ORDER_START: {
      return {
        ...state,
        newOrderState: true,
      };
    }
    case ORDER.NEW_ORDER_END: {
      return {
        ...state,
        newOrderState: false,
        message: undefined,
      };
    }
    case ORDER.NEW_ORDER_FAIL: {
      return {
        ...state,
        newOrderState: false,
        message: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

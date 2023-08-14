import {ORDER} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  data: [],
  current_record: 0,
  total_record: 0,
  nextPage: 1,
  newOrderState: false,
  listOrderState: false,
  message: undefined,
};

export default function orderReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    // new order
    case ORDER.NEW_ORDER_START: {
      return {
        ...state,
        newOrderState: true,
        message: undefined,
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

    // get list order
    case ORDER.LIST_ORDER_START: {
      return {
        ...state,
        listOrderState: true,
        message: undefined,
      };
    }
    case ORDER.LIST_ORDER_END: {
      return {
        ...state,
        listOrderState: false,
        message: undefined,
        data: [...state.data, ...action.payload.data],
        total_record: action.payload.dInfo.total_record,
        current_record: state.current_record + action.payload.data.length,
        nextPage: state.nextPage + 1,
      };
    }
    case ORDER.LIST_ORDER_FAIL: {
      return {
        ...state,
        listOrderState: false,
        message: action.payload,
        total_record: 0,
        current_record: 0,
        nextPage: 1,
      };
    }
    case ORDER.LIST_ORDER_CLEAR: {
      return {
        ...state,
        data: [],
        current_record: 0,
        total_record: 0,
        nextPage: 1,
        listOrderState: false,
        message: undefined,
      };
    }

    // default
    default: {
      return state;
    }
  }
}

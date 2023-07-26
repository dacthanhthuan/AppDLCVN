import {PRODUCT_LIST} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  loading: false,
  data: [],
};

export default function ProductListReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case PRODUCT_LIST.START:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LIST.END:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case PRODUCT_LIST.FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case PRODUCT_LIST.CLEAR:
      return initialState;
    default:
      return state;
  }
}

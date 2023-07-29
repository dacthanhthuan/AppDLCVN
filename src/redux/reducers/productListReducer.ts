import {PRODUCT_LIST} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  loading: false,
  data: [],
  theme: [],
  popup: [],
  total_record: 0,
  current_record: 0,
  nextpage: 1,
  message: '',
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
        data: [...state.data, action.payload.data.l],
        theme:
          action.payload.data.page == 1
            ? action.payload.data.theme
            : state.theme,
        popup:
          action.payload.data.page == 1
            ? action.payload.data.popup
            : state.popup,
        total_record: action.payload.data.total_record,
        current_record: state.current_record + action.payload.data.l.length,
        nextpage: state.nextpage + 1,
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

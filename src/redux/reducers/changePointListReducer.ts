import {CHANGE_POINT_LIST} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  loading: false,
  data: [],
};

export default function ChangePointListReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case CHANGE_POINT_LIST.START:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_POINT_LIST.END:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case CHANGE_POINT_LIST.FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CHANGE_POINT_LIST.CLEAR:
      return initialState;
    default:
      return state;
  }
}

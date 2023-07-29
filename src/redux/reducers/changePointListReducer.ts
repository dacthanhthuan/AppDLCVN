import {CHANGE_POINT_LIST} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  loading: false,
  total_record: 0,
  current_record: 0,
  nextpage: 1,
  data: [],
  message: '',
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
        data: [...state.data, ...action.payload.data.l],
        total_record: action.payload.data.total_record,
        current_record: state.current_record + action.payload.data.l.length,
        nextpage: state.nextpage + 1,
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

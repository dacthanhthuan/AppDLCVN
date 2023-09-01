import {DETAIL_MEMBER} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  loading: false,
  message: undefined,
  data: {},
};

export default function DetailMemberReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case DETAIL_MEMBER.START: {
      return {
        ...state,
        loading: true,
        message: undefined,
      };
    }

    case DETAIL_MEMBER.END: {
      return {
        ...state,
        loading: false,
        message:
          action.payload.l.length > 0 ? undefined : 'Không tìm thấy người dùng',
        data: action.payload.l.length > 0 ? action.payload.l[0] : {},
      };
    }

    case DETAIL_MEMBER.FAIL: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }

    default:
      return state;
  }
}

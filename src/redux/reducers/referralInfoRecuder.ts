import {REFERRAL_INFO} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  loading: false,
  message: undefined,
  data: {},
};

export default function ReferralInfoReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case REFERRAL_INFO.START: {
      return {
        ...state,
        loading: true,
        message: undefined,
      };
    }

    case REFERRAL_INFO.START: {
      return {
        ...state,
        loading: false,
        message: undefined,
        data: action.payload,
      };
    }

    case REFERRAL_INFO.START: {
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

import {CLEAR, INITIAL} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  domain: '',
  api: '',
  loading: true,
};

export default function AppReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case INITIAL.END:
      return {
        domain: action.payload?.main_domain,
        api: action.payload?.apikey,
        loading: false,
      };
    case INITIAL.FAIL:
      return {
        ...state,
        state: 'fail',
        message: action.payload,
      };
    case CLEAR.APP:
      return initialState;
    default:
      return state;
  }
}

import {
  CLIENT_REGISTER_FAIL,
  CLIENT_REGISTER_END,
  CLIENT_LOGIN_END,
  CLIENT_LOGIN_FAIL,
} from '../actions/types';
import initialState from '../store/initialState';
import {AnyAction} from 'redux';

export default function UserReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case CLIENT_LOGIN_END:
    case CLIENT_REGISTER_END:
      return {
        ...state,
        user: {
          ...action.payload,
          login: true,
        },
      };
    case CLIENT_LOGIN_FAIL:
    case CLIENT_REGISTER_FAIL:
      return {
        ...state,
        user: {
          ...action.payload,
          login: false,
        },
      };
    default:
      return state;
  }
}

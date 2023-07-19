import {LOGIN, REGISTER, CLEAR} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  loading: false,
  login: {
    status: false,
    message: null,
  },
  register: {
    status: false,
    message: null,
  },
};

export default function UserReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case LOGIN.START:
    case REGISTER.START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN.END:
      return {
        ...action.payload,
        loading: false,
        login: {
          status: true,
          message: action.payload.message,
        },
      };
    case REGISTER.END:
      return {
        ...action.payload,
        loading: false,
        register: {
          status: true,
          message: action.payload.message,
        },
      };
    case LOGIN.FAIL:
      return {
        ...state,
        loading: false,
        login: {
          status: false,
          message: action.payload.message,
        },
      };
    case REGISTER.FAIL:
      return {
        ...state,
        loading: false,
        register: {
          status: false,
          message: action.payload.message,
        },
      };
    case CLEAR.USER:
      return initialState;
    default:
      return state;
  }
}

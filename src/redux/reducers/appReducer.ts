import {CLIENT_INITIAL_END} from '../actions/types';
import initialState from '../store/initialState';
import {AnyAction} from 'redux';

export default function AppReducer(state = initialState, action: AnyAction) {
  if (action.type === CLIENT_INITIAL_END) {
    return {
      ...state,
      app: {
        domain: action.payload?.main_domain,
        api: action.payload?.apikey,
      },
    };
  } else return state;
}

import store from '../store';
import {CLIENT_LOGIN_END, CLIENT_LOGIN_FAIL, CLIENT_LOGIN_START} from './types';

export const clientLoginStart = (mobile: string, password: string) => {
  const form = new FormData();
  form.append('username', mobile);
  form.append('password', password);

  return {
    type: CLIENT_LOGIN_START,
    payload: form,
    domain: store.getState().AppReducer.app.domain,
    api: store.getState().AppReducer.app.api,
  };
};

export const clientLoginEnd = (data: any) => ({
  type: CLIENT_LOGIN_END,
  payload: data,
});

export const clientLoginFail = (data: any) => ({
  type: CLIENT_LOGIN_FAIL,
  payload: data,
});

import {$CombinedState} from 'redux';
import store from '../store';
import {
  CLIENT_REGISTER_END,
  CLIENT_REGISTER_FAIL,
  CLIENT_REGISTER_START,
} from './types';
import {useSelector} from 'react-redux';

export const clientRegisterStart = (
  fullname: string,
  email: string,
  mobile: string,
  password: string,
  referral: string,
) => {
  const form = new FormData();
  form.append('fullname', fullname);
  form.append('email', email);
  form.append('mobile', mobile);
  form.append('password', password);
  form.append('referral_by', referral);

  return {
    type: CLIENT_REGISTER_START,
    payload: form,
    domain: store.getState().AppReducer.app.domain,
    api: store.getState().AppReducer.app.api,
  };
};

export const clientRegisterEnd = (data: any) => ({
  type: CLIENT_REGISTER_END,
  payload: data,
});

export const clientRegisterFail = (data: any) => ({
  type: CLIENT_REGISTER_FAIL,
  payload: data,
});

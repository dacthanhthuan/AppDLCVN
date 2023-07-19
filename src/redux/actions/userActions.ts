import store from '../store';
import {LOGIN, REGISTER, CLEAR} from './types';

//Login actions
export const clientLoginStart = (mobile: string, password: string) => {
  //Declare formdata to pass in axios post method
  const form = new FormData();
  form.append('username', mobile);
  form.append('password', password);

  return {
    type: LOGIN.START,
    payload: form,
    domain: store.getState().app.domain, //domain from app
    api: store.getState().app.api, //api from app
  };
};

export const clientLoginEnd = (data: any) => ({
  type: LOGIN.END,
  payload: data,
});

export const clientLoginFail = (data: any) => ({
  type: LOGIN.FAIL,
  payload: data,
});

//Register actions
export const clientRegisterStart = (
  fullname: string,
  email: string,
  mobile: string,
  password: string,
  referral: string,
) => {
  //Declare formdata to pass in axios post method
  const form = new FormData();
  form.append('fullname', fullname);
  form.append('email', email);
  form.append('mobile', mobile);
  form.append('password', password);
  form.append('referral_by', referral);

  return {
    type: REGISTER.START,
    payload: form,
    domain: store.getState().app.domain, //domain from app
    api: store.getState().app.api, //api from app
  };
};

export const clientRegisterEnd = (data: any) => ({
  type: REGISTER.END,
  payload: data,
});

export const clientRegisterFail = (data: any) => ({
  type: REGISTER.FAIL,
  payload: data,
});

//Clear user data action
export const clientClearUserData = {
  type: CLEAR.USER,
};

import {PRODUCT_LIST} from './types';

export const clientProductListStart = (
  page: string,
  for_point: string,
  session_token?: string,
) => {
  const form = new FormData();
  form.append('page', page);
  form.append('for_point', for_point);
  session_token ? form.append('token', session_token) : null;

  return {
    type: PRODUCT_LIST.START,
    payload: form,
  };
};
export const clientProductListEnd = (data: any) => ({
  type: PRODUCT_LIST.END,
  payload: data,
});

export const clientProductListFail = (data: any) => ({
  type: PRODUCT_LIST.FAIL,
  payload: data,
});

export const clientProductListClear = {
  type: PRODUCT_LIST.CLEAR,
};

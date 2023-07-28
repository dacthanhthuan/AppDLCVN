import {CHANGE_POINT_LIST, PRODUCT_LIST} from './types';

export const clientProductListStart = (
  page: string,
  for_point = '0',
  session_token?: string,
) => {
  const form = new FormData();
  form.append('page', page);
  form.append('for_point', for_point);
  session_token ? form.append('token', session_token) : null;

  return {
    type: for_point == '0' ? PRODUCT_LIST.START : CHANGE_POINT_LIST.START,
    payload: form,
  };
};

export const clientProductListEnd = (
  data: any,
  actionType: PRODUCT_LIST.START | CHANGE_POINT_LIST.START,
) => {
  return {
    type:
      actionType === PRODUCT_LIST.START
        ? PRODUCT_LIST.END
        : CHANGE_POINT_LIST.END,
    payload: data,
  };
};

export const clientProductListFail = (
  data: any,
  actionType: PRODUCT_LIST.START | CHANGE_POINT_LIST.START,
) => ({
  type:
    actionType === PRODUCT_LIST.START
      ? PRODUCT_LIST.FAIL
      : CHANGE_POINT_LIST.FAIL,
  payload: data,
});

export const clientProductListClear = (
  actionType: PRODUCT_LIST.CLEAR | CHANGE_POINT_LIST.CLEAR,
) => ({
  type: actionType,
});

import {ADDRESS_BOOK} from './types';

export const addressBookListAllStart = (token: string) => {
  const form = new FormData();
  form.append('token', token);

  return {
    type: ADDRESS_BOOK.LIST_ALL_START,
    payload: form,
  };
};
export const addressBookListAllEnd = (data: any) => ({
  type: ADDRESS_BOOK.LIST_ALL_END,
  payload: data,
});
export const addressBookListAllFail = (message: string) => ({
  type: ADDRESS_BOOK.LIST_ALL_FAIL,
  payload: message,
});

type NewAddressStartType = {
  token: string;
  city_id: number;
  district_id: number;
  ward_id: number;
  address: string;
  mobile: string;
  fullname: string;
};

export const addressBookNewStart = (item: NewAddressStartType) => {
  const form = new FormData();
  form.append('token', item.token);
  form.append('city_id', item.city_id);
  form.append('district_id', item.district_id);
  form.append('ward_id', item.ward_id);
  form.append('address', item.address);
  form.append('mobile', item.mobile);
  form.append('fullname', item.fullname);

  return {
    type: ADDRESS_BOOK.NEW_START,
    payload: form,
  };
};
export const addressBookNewEnd = (data: any) => ({
  type: ADDRESS_BOOK.NEW_END,
  payload: data,
});
export const addressBookNewFail = (message: string) => ({
  type: ADDRESS_BOOK.NEW_FAIL,
  payload: message,
});

type UpdateAddressStartType = {
  token: string;
  id: string;
  city_id: number;
  district_id: number;
  ward_id: number;
  address: string;
  mobile: string;
  fullname: string;
};

export const addressBookUpdateStart = (item: UpdateAddressStartType) => {
  const form = new FormData();
  form.append('token', item.token);
  form.append('city_id', item.city_id);
  form.append('district_id', item.district_id);
  form.append('ward_id', item.ward_id);
  form.append('address', item.address);
  form.append('mobile', item.mobile);
  form.append('fullname', item.fullname);
  form.append('id', item.id);

  return {
    type: ADDRESS_BOOK.UPDATE_START,
    payload: form,
  };
};
export const addressBookUpdateEnd = (data: any) => ({
  type: ADDRESS_BOOK.UPDATE_END,
  payload: data,
});
export const addressBookUpdateFail = (message: string) => ({
  type: ADDRESS_BOOK.UPDATE_FAIL,
  payload: message,
});

type SetDefaultAddressStartType = {
  token: string;
  id: string;
};

export const addressBookSetDefaultStart = (
  item: SetDefaultAddressStartType,
) => {
  const form = new FormData();
  form.append('token', item.token);
  form.append('id', item.id);

  return {
    type: ADDRESS_BOOK.SET_DEFAULT_START,
    payload: form,
  };
};
export const addressBookSetDefaultEnd = (data: any) => ({
  type: ADDRESS_BOOK.SET_DEFAULT_END,
  payload: data,
});
export const addressBookSetDefaultFail = (message: string) => ({
  type: ADDRESS_BOOK.SET_DEFAULT_FAIL,
  payload: message,
});

export const addressBookClear = {
  type: ADDRESS_BOOK.ADDRESS_CLEAR,
};

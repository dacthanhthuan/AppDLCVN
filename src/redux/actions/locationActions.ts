import {LOCATION} from './types';

export const locationListCityStart = (token: string) => {
  const form = new FormData();
  form.append('token', token);

  return {
    type: LOCATION.LIST_CITY_START,
    payload: form,
  };
};
export const locationListCityEnd = (data: any) => {
  return {
    type: LOCATION.LIST_CITY_END,
    payload: data,
  };
};
export const locationListCityFail = (message: string) => {
  return {
    type: LOCATION.LIST_CITY_FAIL,
    payload: message,
  };
};

export const locationListDistrictStart = (token: string, city_id: string) => {
  const form = new FormData();
  form.append('token', token);
  form.append('city_id', city_id);

  return {
    type: LOCATION.LIST_DISTRICT_START,
    payload: form,
  };
};
export const locationListDistrictEnd = (data: any) => {
  return {
    type: LOCATION.LIST_DISTRICT_END,
    payload: data,
  };
};
export const locationListDistrictFail = (message: string) => {
  return {
    type: LOCATION.LIST_DISTRICT_FAIL,
    payload: message,
  };
};

export const locationListWardStart = (token: string, district_id: string) => {
  const form = new FormData();
  form.append('token', token);
  form.append('district_id', district_id);

  return {
    type: LOCATION.LIST_WARD_START,
    payload: form,
  };
};
export const locationListWardEnd = (data: any) => {
  return {
    type: LOCATION.LIST_WARD_END,
    payload: data,
  };
};
export const locationListWardFail = (message: string) => {
  return {
    type: LOCATION.LIST_WARD_FAIL,
    payload: message,
  };
};

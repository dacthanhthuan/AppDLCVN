import {CLEAR, INITIAL} from './types';

const form = new FormData();
form.append('app_name', 'khttest');

export const clientInitialApiStart = {
  type: INITIAL.START,
  payload: form,
};

export const clientInitialApiEnd = (data: any) => ({
  type: INITIAL.END,
  payload: data,
});

export const clientInitialApiFail = (data: any) => ({
  type: INITIAL.FAIL,
  payload: data,
});

//Clear app data action
export const clientInitialApiClear = {
  type: CLEAR.APP,
};

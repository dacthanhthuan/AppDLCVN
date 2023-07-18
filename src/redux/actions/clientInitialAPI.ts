import {CLIENT_INITIAL_END, CLIENT_INITIAL_START} from './types';

const form = new FormData();
form.append('app_name', 'khttest');

export const clientInitialApiStart = {
  type: CLIENT_INITIAL_START,
  payload: form,
};

export const clientInitialApiEnd = (data: any) => ({
  type: CLIENT_INITIAL_END,
  payload: data,
});

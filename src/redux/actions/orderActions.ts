import {ORDER} from './types';

type NewOrderStartProps = {
  token: string;
  ship_name: string;
  ship_mobile: string;
  ship_address: string;
  ship_note: string;
  lItems: [];
  ship_fee: string;
  address_book_id: string;
  payment_cashback: string;
  payment_cod: string;
  payment_wallet: string;
};

export const newOrderStart = (data: NewOrderStartProps) => {
  const form = new FormData();
  form.append('token', data.token);
  form.append('ship_name', data.ship_name);
  form.append('ship_mobile', data.ship_mobile);
  form.append('ship_address', data.ship_address);
  form.append('ship_note', data.ship_note);
  form.append('lItems', data.lItems);
  form.append('ship_fee', data.ship_fee);
  form.append('address_book_id', data.address_book_id);
  form.append('payment_cashback', data.payment_cashback);
  form.append('payment_wallet', data.payment_wallet);
  form.append('payment_cod', data.payment_cod);

  return {
    type: ORDER.NEW_ORDER_START,
    payload: form,
  };
};

export const newOrderEnd = (data: any) => ({
  type: ORDER.NEW_ORDER_END,
  payload: data,
});

export const newOrderFail = (msg: string) => ({
  type: ORDER.NEW_ORDER_FAIL,
  payload: msg,
});

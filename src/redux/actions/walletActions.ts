import {WALLET} from './types';

const getWalletBankListStart = (token: string) => {
  const form = new FormData();
  form.append('token', token);

  return {
    type: WALLET.BANK_LIST_START,
    payload: form,
  };
};
const getWalletBankListEnd = (data: any) => ({
  type: WALLET.BANK_LIST_END,
  payload: data,
});
const getWalletBankListFail = (msg: string) => ({
  type: WALLET.BANK_LIST_FAIL,
  payload: msg,
});

export const WalletBankList = {
  start: getWalletBankListStart,
  end: getWalletBankListEnd,
  fail: getWalletBankListFail,
};

type StartHistoryType = {
  token: string;
  type: string;
  page: string;
};

const getFundHistoryListStart = (data: StartHistoryType) => {
  const form = new FormData();
  form.append('token', data.token);
  form.append('type', data.type);
  form.append('page', data.page);

  return {
    type: WALLET.FUND_HISTORY_START,
    payload: form,
  };
};
const getFundHistoryListEnd = (data: any) => ({
  type: WALLET.FUND_HISTORY_END,
  payload: data,
});
const getFundHistoryListFail = (msg: string) => ({
  type: WALLET.FUND_HISTORY_FAIL,
  payload: msg,
});
const clearFundHistoryList = () => ({
  type: WALLET.FUND_HISTORY_CLEAR,
});

export const WalletFundHistoryList = {
  start: getFundHistoryListStart,
  end: getFundHistoryListEnd,
  fail: getFundHistoryListFail,
  clear: clearFundHistoryList,
};

type HistoryWalletProps = {
  token?: string;
  page?: string | number;
  wallet_id?: string | number;
};

const getHistoryWalletStart = (data: HistoryWalletProps) => {
  const form = new FormData();
  form.append('token', data.token);
  form.append('page', data.page);
  form.append('wallet_id', data.wallet_id);

  return {
    type: WALLET.HISTORY_START,
    payload: form,
  };
};
const getHistoryWalletEnd = (data: any) => ({
  type: WALLET.HISTORY_END,
  payload: data,
});
const getHistoryWalletFail = (msg: string) => ({
  type: WALLET.HISTORY_FAIL,
  payload: msg,
});
const clearHistoryWallet = () => ({
  type: WALLET.HISTORY_CLEAR,
});

export const WalletHistoryList = {
  start: getHistoryWalletStart,
  end: getHistoryWalletEnd,
  fail: getHistoryWalletFail,
  clear: clearHistoryWallet,
};

type WalletDepositType = {
  token: string;
  amount: string;
  note: string;
  bank_id: string;
};

const WalletDepositStart = (data: WalletDepositType) => {
  const form = new FormData();
  form.append('token', data.token);
  form.append('amount', data.amount);
  form.append('note', data.note);
  form.append('bank_id', data.bank_id);

  return {
    type: WALLET.DEPOSIT_START,
    payload: form,
  };
};
const WalletDepositEnd = (data: any) => ({
  type: WALLET.DEPOSIT_END,
  payload: data,
});
const WalletDepositFail = (msg: string) => ({
  type: WALLET.DEPOSIT_FAIL,
  payload: msg,
});

export const WalletDeposit = {
  start: WalletDepositStart,
  end: WalletDepositEnd,
  fail: WalletDepositFail,
};

type WalletWithdrawType = {
  token: string;
  amount: string;
  note: string;
};

const WalletWithdrawStart = (data: WalletWithdrawType) => {
  const form = new FormData();
  form.append('token', data.token);
  form.append('amount', data.amount);
  form.append('note', data.note);

  return {
    type: WALLET.WITHDRAW_START,
    payload: form,
  };
};
const WalletWithdrawEnd = (data: any) => ({
  type: WALLET.WITHDRAW_END,
  payload: data,
});
const WalletWithdrawFail = (msg: string) => ({
  type: WALLET.WITHDRAW_FAIL,
  payload: msg,
});

export const WalletWithdraw = {
  start: WalletWithdrawStart,
  end: WalletWithdrawEnd,
  fail: WalletWithdrawFail,
};

type CancelProps = {
  token: string;
  id: string;
  note: string;
};

const WalletCancelStart = (data: CancelProps) => {
  const form = new FormData();
  form.append('token', data.token);
  form.append('id', data.id);
  form.append('note', data.note);

  return {
    type: WALLET.CANCEL_START,
    payload: form,
  };
};
const WalletCancelEnd = (data: any) => ({
  type: WALLET.CANCEL_END,
  payload: data,
});
const WalletCancelFail = (msg: string) => ({
  type: WALLET.CANCEL_FAIL,
  payload: msg,
});

export const WalletCancel = {
  start: WalletCancelStart,
  end: WalletCancelEnd,
  fail: WalletCancelFail,
};

type AddBankInforProps = {
  token: string;
  bank_name: string;
  bank_account: string;
  bank_fullname: string;
  bank_branch: string;
  bank_city: string;
  password: string;
};

const WalletAddBankInforStart = (data: AddBankInforProps) => {
  const form = new FormData();
  form.append('token', data.token);
  form.append('bank_name', data.bank_name);
  form.append('bank_account', data.bank_account);
  form.append('bank_fullname', data.bank_fullname);
  form.append('bank_branch', data.bank_branch);
  form.append('bank_city', data.bank_city);
  form.append('password', data.password);

  return {
    type: WALLET.ADD_BANK_INFOR_START,
    payload: form,
  };
};
const WalletAddBankInforEnd = (data: any) => ({
  type: WALLET.ADD_BANK_INFOR_END,
  payload: data,
});
const WalletAddBankInforFail = (msg: string) => ({
  type: WALLET.ADD_BANK_INFOR_FAIL,
  payload: msg,
});

export const WalletAddBankInfor = {
  start: WalletAddBankInforStart,
  end: WalletAddBankInforEnd,
  fail: WalletAddBankInforFail,
};

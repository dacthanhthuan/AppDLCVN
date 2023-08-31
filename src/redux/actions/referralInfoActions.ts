import {REFERRAL_INFO} from './types';

const referral_info_start = (token: string) => {
  const form = new FormData();
  form.append('token', token);

  return {
    type: REFERRAL_INFO.START,
    payload: form,
  };
};

const referral_info_end = (data: any) => ({
  type: REFERRAL_INFO.END,
  payload: data,
});

const referral_info_fail = (msg: string) => ({
  type: REFERRAL_INFO.FAIL,
  payload: msg,
});

export const ReferralInfo = {
  start: referral_info_start,
  end: referral_info_end,
  fail: referral_info_fail,
};

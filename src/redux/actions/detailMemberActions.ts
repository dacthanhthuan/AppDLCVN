import {DETAIL_MEMBER} from './types';

type DetailMemberProps = {
  token: string;
  keyword: string;
  type: string;
};

const detail_member_start = (data: DetailMemberProps) => {
  const form = new FormData();
  form.append('token', data.token);
  form.append('keyword', data.keyword);
  form.append('type', data.type);

  return {
    type: DETAIL_MEMBER.START,
    payload: form,
  };
};

const detail_member_end = (data: any) => ({
  type: DETAIL_MEMBER.END,
  payload: data,
});

const detail_member_fail = (msg: string) => ({
  type: DETAIL_MEMBER.FAIL,
  payload: msg,
});

export const DetailMember = {
  start: detail_member_start,
  end: detail_member_end,
  fail: detail_member_fail,
};

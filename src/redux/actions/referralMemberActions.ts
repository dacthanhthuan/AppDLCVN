import {REFERRAL_MEMBER} from './types';

export type MemberListStartFormData = {
  token: string;
  page: string | number;
  field?: string;
  sort?: string;
  keyword?: string;
  joined_at?: string;
  member_group_id?: string;
  member_department_id?: string;
  user_id?: string;
};

function referral_member_list_start(data: MemberListStartFormData) {
  const form = new FormData();
  form.append('token', data.token);
  form.append('page', data.page);
  form.append('field', data.field);
  form.append('sort', data.sort);
  form.append('keyword', data.keyword);
  form.append('user_id', data.user_id);
  form.append('joined_at', data.joined_at ? data.joined_at : '');
  form.append(
    'member_group_id',
    data.member_group_id ? data.member_group_id : '',
  );
  form.append(
    'member_department_id',
    data.member_department_id ? data.member_department_id : '',
  );

  return {
    type: REFERRAL_MEMBER.LIST_START,
    payload: form,
  };
}

function referral_member_list_end(data: any) {
  return {
    type: REFERRAL_MEMBER.LIST_END,
    payload: data,
  };
}

function referral_member_list_fail(msg: string) {
  return {
    type: REFERRAL_MEMBER.LIST_FAIL,
    payload: msg,
  };
}

function referral_member_list_clear() {
  return {
    type: REFERRAL_MEMBER.LIST_CLEAR,
  };
}

export const ReferralMemberList = {
  start: referral_member_list_start,
  end: referral_member_list_end,
  fail: referral_member_list_fail,
  clear: referral_member_list_clear,
};

type AddUpdateFormData = {
  token: string;
  user_id?: string;
  mobile?: string;
  fullname?: string;
  password?: string;
  email?: string;
  cmnd?: string;
  website?: string;
  birthday?: string;
  sex?: string;
  city?: string;
  city_id?: string;
  district?: string;
  district_id?: string;
  ward?: string;
  ward_id?: string;
  address?: string;
  bank_account?: string;
  bank_name?: string;
  bank_fullname?: string;
  bank_branch?: string;
  avatar?: string;
  member_group_id?: string;
};

function referral_member_add_update_start(data: AddUpdateFormData) {
  const form = new FormData();
  form.append('token', data.token);
  form.append('user_id', data.user_id ? data.user_id : '');
  form.append('mobile', data.mobile ? data.mobile : '');
  form.append('fullname', data.fullname ? data.fullname : '');
  form.append('password', data.password ? data.password : '');
  form.append('email', data.email ? data.email : '');
  form.append('cmnd', data.cmnd ? data.cmnd : '');
  form.append('website', data.website ? data.website : '');
  form.append('birthday', data.birthday ? data.birthday : '');
  form.append('sex', data.sex ? data.sex : '');
  form.append('city', data.city ? data.city : '');
  form.append('city_id', data.city_id ? data.city_id : '');
  form.append('district', data.district ? data.district : '');
  form.append('district_id', data.district_id ? data.district_id : '');
  form.append('ward', data.ward ? data.ward : '');
  form.append('ward_id', data.ward_id ? data.ward_id : '');
  form.append('bank_account', data.bank_account ? data.bank_account : '');
  form.append('bank_name', data.bank_name ? data.bank_name : '');
  form.append('bank_fullname', data.bank_fullname ? data.bank_fullname : '');
  form.append('bank_branch', data.bank_branch ? data.bank_branch : '');
  form.append('avatar', data.avatar ? data.avatar : '');
  form.append(
    'member_group_id',
    data.member_group_id ? data.member_group_id : '',
  );

  return {
    type: REFERRAL_MEMBER.UPDATE_ADD_MEMBER_START,
    payload: form,
  };
}

function referral_member_add_update_end(data: any) {
  return {
    type: REFERRAL_MEMBER.UPDATE_ADD_MEMBER_END,
    payload: data,
  };
}

function referral_member_add_update_fail(msg: string) {
  return {
    type: REFERRAL_MEMBER.UPDATE_ADD_MEMBER_FAIL,
    payload: msg,
  };
}

export const ReferralMemberUpdateAdd = {
  start: referral_member_add_update_start,
  end: referral_member_add_update_end,
  fail: referral_member_add_update_fail,
};

function referral_member_booking_list_start(
  token: string,
  members_id: string,
  page: string | number,
) {
  const form = new FormData();
  form.append('token', token);
  form.append('members_id', members_id);
  form.append('page', page);

  return {
    type: REFERRAL_MEMBER.BOOKING_ORDER_LIST_START,
    payload: form,
  };
}

function referral_member_booking_list_end(data: any) {
  return {
    type: REFERRAL_MEMBER.BOOKING_ORDER_LIST_END,
    payload: data,
  };
}

function referral_member_booking_list_fail(msg: string) {
  return {
    type: REFERRAL_MEMBER.BOOKING_ORDER_LIST_FAIL,
    payload: msg,
  };
}

function referral_member_booking_list_clear() {
  return {type: REFERRAL_MEMBER.BOOKING_ORDER_LIST_CLEAR};
}

export const ReferralMemberBookingOrder = {
  start: referral_member_booking_list_start,
  end: referral_member_booking_list_end,
  fail: referral_member_booking_list_fail,
  clear: referral_member_booking_list_clear,
};

function referral_member_order_list_start(
  token: string,
  members_id: string,
  page: string | number,
) {
  const form = new FormData();
  form.append('token', token);
  form.append('members_id', members_id);
  form.append('page', page);

  return {
    type: REFERRAL_MEMBER.HISTORY_ORDERED_LIST_START,
    payload: form,
  };
}

function referral_member_order_list_end(data: any) {
  return {
    type: REFERRAL_MEMBER.HISTORY_ORDERED_LIST_END,
    payload: data,
  };
}

function referral_member_order_list_fail(msg: string) {
  return {
    type: REFERRAL_MEMBER.HISTORY_ORDERED_LIST_FAIL,
    payload: msg,
  };
}

function referral_member_order_list_clear() {
  return {type: REFERRAL_MEMBER.HISTORY_ORDERED_LIST_CLEAR};
}

export const ReferralMemberHistoryOrder = {
  start: referral_member_order_list_start,
  end: referral_member_order_list_end,
  fail: referral_member_order_list_fail,
  clear: referral_member_order_list_clear,
};

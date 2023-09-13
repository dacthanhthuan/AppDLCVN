import {REPORT_CEO} from './types';

const shopIdStart = (token: string) => {
  const form = new FormData();
  form.append('token', token);

  return {
    type: REPORT_CEO.SHOP_ID_START,
    payload: form,
  };
};

const shopIdEnd = (data: any) => ({
  type: REPORT_CEO.SHOP_ID_END,
  payload: data,
});

const shopIdFail = (msg: string) => ({
  type: REPORT_CEO.SHOP_ID_FAIL,
  payload: msg,
});

export const RPCEOShopId = {
  start: shopIdStart,
  end: shopIdEnd,
  fail: shopIdFail,
};

const summaryStart = (
  token: string,
  shopId: string,
  month: string | number,
  year: string | number,
) => {
  const form = new FormData();
  form.append('token', token);
  form.append('shop_id', shopId);
  form.append('month', month);
  form.append('year', year);

  return {
    type: REPORT_CEO.SUMMARY_START,
    payload: form,
  };
};

const summaryEnd = (data: any) => ({
  type: REPORT_CEO.SUMMARY_END,
  payload: data,
});

const summaryFail = (msg: string) => ({
  type: REPORT_CEO.SUMMARY_FAIL,
  payload: msg,
});

const summaryClear = () => ({
  type: REPORT_CEO.SUMMARY_CLEAR,
});

export const RPCEOSummary = {
  start: summaryStart,
  end: summaryEnd,
  fail: summaryFail,
  clear: summaryClear,
};

const chartStart = (
  token: string,
  shopId: string,
  type: string,
  reportType: string,
) => {
  const form = new FormData();
  form.append('token', token);
  form.append('shop_id', shopId);
  form.append('type', type);
  form.append('report_type', reportType);

  return {
    type: REPORT_CEO.CHART_START,
    payload: form,
  };
};

const chartEnd = (data: any) => ({
  type: REPORT_CEO.CHART_END,
  payload: data,
});

const chartFail = (msg: string) => ({
  type: REPORT_CEO.CHART_FAIL,
  payload: msg,
});

const chartClear = () => ({
  type: REPORT_CEO.CHART_CLEAR,
});

export const RPCEOChart = {
  start: chartStart,
  end: chartEnd,
  fail: chartFail,
  clear: chartClear,
};

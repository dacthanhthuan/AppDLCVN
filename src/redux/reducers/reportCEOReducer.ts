import {REPORT_CEO} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  message: undefined,

  shopIdLoading: false,
  shopId: [],

  summaryLoading: false,
  summary: {},

  chartLoading: false,
  chart: {},
};

export default function reportCEOReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    // shop id
    case REPORT_CEO.SHOP_ID_START: {
      return {
        ...state,
        message: undefined,
        shopIdLoading: true,
      };
    }
    case REPORT_CEO.SHOP_ID_END: {
      return {
        ...state,
        message: undefined,
        shopIdLoading: false,
        shopId: action.payload.shop,
      };
    }
    case REPORT_CEO.SHOP_ID_FAIL: {
      return {
        ...state,
        message: action.payload,
        shopIdLoading: false,
      };
    }

    // summary
    case REPORT_CEO.SUMMARY_START: {
      return {
        ...state,
        message: undefined,
        summaryLoading: true,
      };
    }
    case REPORT_CEO.SUMMARY_END: {
      return {
        ...state,
        message: undefined,
        summaryLoading: false,
        summary: action.payload,
      };
    }
    case REPORT_CEO.SUMMARY_FAIL: {
      return {
        ...state,
        message: action.payload,
        summaryLoading: false,
      };
    }
    case REPORT_CEO.SUMMARY_CLEAR: {
      return {
        ...state,
        message: undefined,
        summaryLoading: false,
        summary: {},
      };
    }

    // chart
    case REPORT_CEO.CHART_START: {
      return {
        ...state,
        message: undefined,
        chartLoading: true,
      };
    }
    case REPORT_CEO.CHART_END: {
      return {
        ...state,
        message: undefined,
        chartLoading: false,
        chart: action.payload,
      };
    }
    case REPORT_CEO.CHART_FAIL: {
      return {
        ...state,
        message: action.payload,
        chartLoading: false,
      };
    }
    case REPORT_CEO.CHART_CLEAR: {
      return {
        ...state,
        message: undefined,
        chartLoading: false,
        chart: {},
      };
    }

    default:
      return state;
  }
}

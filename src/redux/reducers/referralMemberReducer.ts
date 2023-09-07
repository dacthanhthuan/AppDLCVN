import {REFERRAL_MEMBER} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  message: undefined,

  memberListLoading: false,
  memberList: [],
  statisticList: [],
  memberListTotal: 0,
  memberListCurrent: 0,
  memberListNextPage: 1,

  updateAddLoading: false,

  bookingOrderLoading: false,
  bookingOrder: [],
  bookingOrderTotal: 0,
  bookingOrderCurrent: 0,
  bookingOrderNextPage: 1,

  historyOrderLoading: false,
  historyOrder: [],
  historyOrderTotal: 0,
  historyOrderCurrent: 0,
  historyOrderNextPage: 1,
};

export default function ReferralMemberReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    // member list
    case REFERRAL_MEMBER.LIST_START: {
      return {
        ...state,
        message: undefined,
        memberListLoading: true,
      };
    }
    case REFERRAL_MEMBER.LIST_END: {
      return {
        ...state,
        message: undefined,
        memberListLoading: false,
        memberList: [...state.memberList, ...action.payload.list_members],
        statisticList: action.payload.lStatistic,
        memberListTotal: action.payload.total_record,
        memberListCurrent:
          state.memberListCurrent + action.payload.list_members.length,
        memberListNextPage: state.memberListNextPage + 1,
      };
    }
    case REFERRAL_MEMBER.LIST_FAIL: {
      return {
        ...state,
        message: action.payload,
        memberListLoading: false,
      };
    }
    case REFERRAL_MEMBER.LIST_CLEAR: {
      return {
        ...state,
        message: undefined,
        memberListLoading: false,
        memberList: [],
        statisticList: [],
        memberListTotal: 0,
        memberListCurrent: 0,
        memberListNextPage: 1,
      };
    }

    // add and update member
    case REFERRAL_MEMBER.UPDATE_ADD_MEMBER_START: {
      return {
        ...state,
        message: undefined,
        updateAddLoading: true,
      };
    }

    case REFERRAL_MEMBER.UPDATE_ADD_MEMBER_END: {
      return {
        ...state,
        message: undefined,
        updateAddLoading: false,
      };
    }

    case REFERRAL_MEMBER.UPDATE_ADD_MEMBER_FAIL: {
      return {
        ...state,
        message: action.payload,
        updateAddLoading: false,
      };
    }

    // member booking order list
    case REFERRAL_MEMBER.BOOKING_ORDER_LIST_START: {
      return {
        ...state,
        message: undefined,
        bookingOrderLoading: true,
      };
    }

    case REFERRAL_MEMBER.BOOKING_ORDER_LIST_END: {
      return {
        ...state,
        message: undefined,
        bookingOrderLoading: false,
        bookingOrder: [...state.bookingOrder, ...action.payload.lItems],
        bookingOrderTotal: action.payload.total_record,
        bookingOrderCurrent:
          state.bookingOrderCurrent + action.payload.lItems.length,
        bookingOrderNextPage: state.bookingOrderNextPage + 1,
      };
    }

    case REFERRAL_MEMBER.BOOKING_ORDER_LIST_FAIL: {
      return {
        ...state,
        message: action.payload,
        bookingOrderLoading: false,
      };
    }

    case REFERRAL_MEMBER.BOOKING_ORDER_LIST_CLEAR: {
      return {
        ...state,
        message: undefined,
        bookingOrderLoading: false,
        bookingOrder: [],
        bookingOrderTotal: 0,
        bookingOrderCurrent: 0,
        bookingOrderNextPage: 1,
      };
    }

    // member history order list
    case REFERRAL_MEMBER.HISTORY_ORDERED_LIST_START: {
      return {
        ...state,
        message: undefined,
        historyOrderLoading: true,
      };
    }

    case REFERRAL_MEMBER.HISTORY_ORDERED_LIST_END: {
      return {
        ...state,
        message: undefined,
        historyOrderLoading: false,
        historyOrder: [...state.historyOrder, action.payload.lItems],
        historyOrderTotal: action.payload.total_record,
        historyOrderCurrent:
          state.historyOrderCurrent + action.payload.lItems.length,
        historyOrderNextPage: state.historyOrderNextPage + 1,
      };
    }

    case REFERRAL_MEMBER.HISTORY_ORDERED_LIST_FAIL: {
      return {
        ...state,
        message: action.payload,
        historyOrderLoading: false,
      };
    }

    case REFERRAL_MEMBER.HISTORY_ORDERED_LIST_CLEAR: {
      return {
        ...state,
        message: undefined,
        historyOrderLoading: false,
        historyOrder: [],
        historyOrderTotal: 0,
        historyOrderCurrent: 0,
        historyOrderNextPage: 1,
      };
    }

    default:
      return state;
  }
}

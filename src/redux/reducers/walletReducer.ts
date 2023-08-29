import {WALLET} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  message: undefined,
  bankListLoading: false,
  bankList: [],
  fundHistoryListLoading: false,
  fundHistoryList: [],
  fundHistoryNextPage: 1,
  fundHistoryTotalRecord: 0,
  fundHistoryCurrentRecord: 0,
  depositLoading: false,
  deposit: {},
  withdrawLoading: false,
  cancelLoading: false,
  addBankInforLoading: false,
  historyWaletLoading: false,
  historyWallet: [],
  historyWalletNextPage: 1,
  historyWalletTotalRecord: 0,
  historyWalletCurrentRecord: 0,
  transferLoading: false,
  referralListLoading: false,
  referralList: [],
  referralListNextPage: 1,
  referralListTotalRecord: 0,
  referralListCurrentRecord: 0,
};

export default function walletReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    // bank list
    case WALLET.BANK_LIST_START: {
      return {
        ...state,
        message: undefined,
        bankListLoading: true,
      };
    }
    case WALLET.BANK_LIST_END: {
      return {
        ...state,
        message: undefined,
        bankListLoading: false,
        bankList: action.payload,
      };
    }
    case WALLET.BANK_LIST_FAIL: {
      return {
        ...state,
        message: action.payload,
        bankListLoading: false,
      };
    }

    // fund history list
    case WALLET.FUND_HISTORY_START: {
      return {
        ...state,
        message: undefined,
        fundHistoryListLoading: true,
      };
    }
    case WALLET.FUND_HISTORY_END: {
      return {
        ...state,
        message: undefined,
        fundHistoryListLoading: false,
        fundHistoryList: [...state.fundHistoryList, ...action.payload.l],
        fundHistoryNextPage: state.fundHistoryNextPage + 1,
        fundHistoryTotalRecord: action.payload.total_record,
        fundHistoryCurrentRecord:
          state.fundHistoryCurrentRecord + action.payload.l.length,
      };
    }
    case WALLET.FUND_HISTORY_FAIL: {
      return {
        ...state,
        message: action.payload,
        fundHistoryListLoading: false,
      };
    }
    case WALLET.FUND_HISTORY_CLEAR: {
      return {
        ...state,
        message: undefined,
        fundHistoryListLoading: false,
        fundHistoryList: [],
        fundHistoryNextPage: 1,
        fundHistoryTotalRecord: 0,
        fundHistoryCurrentRecord: 0,
      };
    }

    // deposit
    case WALLET.DEPOSIT_START: {
      return {
        ...state,
        message: undefined,
        depositLoading: true,
      };
    }
    case WALLET.DEPOSIT_END: {
      return {
        ...state,
        message: undefined,
        depositLoading: false,
        deposit: action.payload,
      };
    }
    case WALLET.DEPOSIT_FAIL: {
      return {
        ...state,
        message: action.payload,
        depositLoading: false,
      };
    }

    // withdraw
    case WALLET.WITHDRAW_START: {
      return {
        ...state,
        message: undefined,
        withdrawLoading: true,
      };
    }
    case WALLET.WITHDRAW_END: {
      return {
        ...state,
        message: undefined,
        withdrawLoading: false,
      };
    }
    case WALLET.WITHDRAW_FAIL: {
      return {
        ...state,
        message: action.payload,
        withdrawLoading: false,
      };
    }

    // cancel transaction
    case WALLET.CANCEL_START: {
      return {
        ...state,
        message: undefined,
        cancelLoading: true,
      };
    }
    case WALLET.CANCEL_END: {
      return {
        ...state,
        message: undefined,
        cancelLoading: false,
      };
    }
    case WALLET.CANCEL_FAIL: {
      return {
        ...state,
        message: action.payload,
        cancelLoading: false,
      };
    }

    // add bank information
    case WALLET.ADD_BANK_INFOR_START: {
      return {
        ...state,
        message: undefined,
        addBankInforLoading: true,
      };
    }
    case WALLET.ADD_BANK_INFOR_END: {
      return {
        ...state,
        message: undefined,
        addBankInforLoading: false,
      };
    }
    case WALLET.ADD_BANK_INFOR_FAIL: {
      return {
        ...state,
        message: action.payload,
        addBankInforLoading: false,
      };
    }

    // history wallet
    case WALLET.HISTORY_START: {
      return {
        ...state,
        message: undefined,
        historyWaletLoading: true,
      };
    }
    case WALLET.HISTORY_END: {
      return {
        ...state,
        message: undefined,
        historyWaletLoading: false,
        historyWallet: [...state.historyWallet, ...action.payload.l],
        historyWalletNextPage: state.historyWalletNextPage + 1,
        historyWalletTotalRecord: action.payload.total_record,
        historyWalletCurrentRecord:
          state.historyWalletCurrentRecord + action.payload.l.length,
      };
    }
    case WALLET.HISTORY_FAIL: {
      return {
        ...state,
        message: action.payload,
        historyWaletLoading: false,
      };
    }
    case WALLET.HISTORY_CLEAR: {
      return {
        ...state,
        message: undefined,
        historyWaletLoading: false,
        historyWallet: [],
        historyWalletNextPage: 1,
        historyWalletTotalRecord: 0,
        historyWalletCurrentRecord: 0,
      };
    }

    // transfer
    case WALLET.TRANSFER_START: {
      return {
        ...state,
        message: undefined,
        transferLoading: true,
      };
    }
    case WALLET.TRANSFER_END: {
      return {
        ...state,
        message: undefined,
        transferLoading: false,
      };
    }
    case WALLET.TRANSFER_FAIL: {
      return {
        ...state,
        message: action.payload,
        transferLoading: true,
      };
    }

    // referral list
    case WALLET.REFERRAL_LIST_START: {
      return {
        ...state,
        message: undefined,
        referralListLoading: true,
      };
    }
    case WALLET.REFERRAL_LIST_END: {
      return {
        ...state,
        message: undefined,
        referralListLoading: false,
        referralList: [...state.referralList, ...action.payload.l],
        referralListNextPage: state.referralListNextPage + 1,
        referralListTotalRecord: action.payload.total_record,
        referralListCurrentRecord:
          state.referralListCurrentRecord + action.payload.l.length,
      };
    }
    case WALLET.REFERRAL_LIST_FAIL: {
      return {
        ...state,
        message: action.payload,
        referralListLoading: false,
      };
    }
    case WALLET.REFERRAL_LIST_CLEAR: {
      return {
        ...state,
        message: undefined,
        referralListLoading: false,
        referralList: [],
        referralListNextPage: 1,
        referralListTotalRecord: 0,
        referralListCurrentRecord: 0,
      };
    }

    default:
      return state;
  }
}

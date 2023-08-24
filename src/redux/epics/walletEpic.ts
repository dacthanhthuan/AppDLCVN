import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {WALLET} from '../actions/types';
import {riseNetworkError} from '../actions/errorHandlerActions';
import {
  WalletAddBankInfor,
  WalletBankList,
  WalletCancel,
  WalletDeposit,
  WalletFundHistoryList,
  WalletHistoryList,
  WalletWithdraw,
} from '../actions/walletActions';
import api_bank_wallet_list from '../../api/api_bank_wallet_list';
import api_wallet_fund_history from '../../api/api_wallet_fund_history';
import api_wallet_deposit from '../../api/api_wallet_deposit';
import api_wallet_withdraw from '../../api/api_wallet_withdraw';
import api_wallet_cancel from '../../api/api_wallet_cancel';
import api_wallet_add_bank_infor from '../../api/api_wallet_add_bank_infor';
import api_wallet_history from '../../api/api_wallet_history';

const walletEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(
      WALLET.BANK_LIST_START,
      WALLET.FUND_HISTORY_START,
      WALLET.DEPOSIT_START,
      WALLET.WITHDRAW_START,
      WALLET.CANCEL_START,
      WALLET.ADD_BANK_INFOR_START,
      WALLET.HISTORY_START,
    ),
    switchMap(async action => {
      switch (action.type) {
        case WALLET.BANK_LIST_START: {
          return await api_bank_wallet_list(action.payload)
            .then(res => WalletBankList.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return WalletBankList.fail(msg);
            });
        }

        case WALLET.FUND_HISTORY_START: {
          return await api_wallet_fund_history(action.payload)
            .then(res => WalletFundHistoryList.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return WalletFundHistoryList.fail(msg);
            });
        }

        case WALLET.DEPOSIT_START: {
          return await api_wallet_deposit(action.payload)
            .then(res => WalletDeposit.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return WalletDeposit.fail(msg);
            });
        }

        case WALLET.WITHDRAW_START: {
          return await api_wallet_withdraw(action.payload)
            .then(res => WalletWithdraw.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return WalletWithdraw.fail(msg);
            });
        }

        case WALLET.CANCEL_START: {
          return await api_wallet_cancel(action.payload)
            .then(res => WalletCancel.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return WalletCancel.fail(msg);
            });
        }

        case WALLET.ADD_BANK_INFOR_START: {
          return await api_wallet_add_bank_infor(action.payload)
            .then(res => WalletAddBankInfor.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return WalletAddBankInfor.fail(msg);
            });
        }

        case WALLET.HISTORY_START: {
          return await api_wallet_history(action.payload)
            .then(res => WalletHistoryList.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return WalletHistoryList.fail(msg);
            });
        }
      }
    }),
  );

export default walletEpic;

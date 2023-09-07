import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {REFERRAL_MEMBER} from '../actions/types';
import {riseNetworkError} from '../actions/errorHandlerActions';
import {
  ReferralMemberBookingOrder,
  ReferralMemberList,
  ReferralMemberHistoryOrder,
  ReferralMemberUpdateAdd,
} from '../actions/referralMemberActions';
import api_referral_member_list from '../../api/api_referral_member_list';
import api_referral_member_booking_list from '../../api/api_referral_member_booking_list';
import api_referral_member_order_list from '../../api/api_referral_member_order_list copy';
import api_referral_member_add_or_update from '../../api/api_referral_member_add_or_update';

const referralMemberEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(
      REFERRAL_MEMBER.LIST_START,
      REFERRAL_MEMBER.BOOKING_ORDER_LIST_START,
      REFERRAL_MEMBER.HISTORY_ORDERED_LIST_START,
      REFERRAL_MEMBER.UPDATE_ADD_MEMBER_START,
    ),
    switchMap(async action => {
      switch (action.type) {
        case REFERRAL_MEMBER.LIST_START:
          return await api_referral_member_list(action.payload)
            .then(res => ReferralMemberList.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return ReferralMemberList.fail(msg);
            });

        case REFERRAL_MEMBER.BOOKING_ORDER_LIST_START:
          return await api_referral_member_booking_list(action.payload)
            .then(res => ReferralMemberBookingOrder.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return ReferralMemberBookingOrder.fail(msg);
            });

        case REFERRAL_MEMBER.HISTORY_ORDERED_LIST_START:
          return await api_referral_member_order_list(action.payload)
            .then(res => ReferralMemberHistoryOrder.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return ReferralMemberHistoryOrder.fail(msg);
            });
        case REFERRAL_MEMBER.UPDATE_ADD_MEMBER_START:
          return await api_referral_member_add_or_update(action.payload)
            .then(res => ReferralMemberUpdateAdd.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return ReferralMemberUpdateAdd.fail(msg);
            });
      }
    }),
  );

export default referralMemberEpic;

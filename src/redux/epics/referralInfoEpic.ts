import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {REFERRAL_INFO} from '../actions/types';
import {riseNetworkError} from '../actions/errorHandlerActions';
import api_info_referral from '../../api/api_info_referral';
import {ReferralInfo} from '../actions/referralInfoActions';

const referralInfoEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(REFERRAL_INFO.START),
    switchMap(async action => {
      return await api_info_referral(action.payload)
        .then(res => ReferralInfo.end(res))
        .catch(msg => {
          if (msg instanceof Error) {
            return riseNetworkError({
              error: msg,
              visible: true,
            });
          }

          return ReferralInfo.fail(msg);
        });
    }),
  );

export default referralInfoEpic;

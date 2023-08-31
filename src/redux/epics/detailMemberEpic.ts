import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {DETAIL_MEMBER} from '../actions/types';
import {riseNetworkError} from '../actions/errorHandlerActions';
import api_detail_member from '../../api/api_detail_member';
import {DetailMember} from '../actions/detailMemberActions';

const detailMemberEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(DETAIL_MEMBER.START),
    switchMap(async action => {
      return await api_detail_member(action.payload)
        .then(res => DetailMember.end(res))
        .catch(msg => {
          if (msg instanceof Error) {
            return riseNetworkError({
              error: msg,
              visible: true,
            });
          }

          return DetailMember.fail(msg);
        });
    }),
  );

export default detailMemberEpic;

import {mergeMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {REPORT_CEO} from '../actions/types';
import {riseNetworkError} from '../actions/errorHandlerActions';
import api_report_ceo_chart from '../../api/api_report_ceo_chart';
import {
  RPCEOChart,
  RPCEOShopId,
  RPCEOSummary,
} from '../actions/reportCeoActions';
import api_report_ceo_shop_id from '../../api/api_report_ceo_shop_id';
import api_report_ceo_summary from '../../api/api_report_ceo_summary';

const reportCEOEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(
      REPORT_CEO.CHART_START,
      REPORT_CEO.SHOP_ID_START,
      REPORT_CEO.SUMMARY_START,
    ),
    mergeMap(async action => {
      switch (action.type) {
        case REPORT_CEO.CHART_START:
          return await api_report_ceo_chart(action.payload)
            .then(res => RPCEOChart.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return RPCEOChart.fail(msg);
            });

        case REPORT_CEO.SHOP_ID_START:
          return await api_report_ceo_shop_id(action.payload)
            .then(res => RPCEOShopId.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return RPCEOShopId.fail(msg);
            });

        case REPORT_CEO.SUMMARY_START:
          return await api_report_ceo_summary(action.payload)
            .then(res => RPCEOSummary.end(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return RPCEOSummary.fail(msg);
            });
      }
    }),
  );

export default reportCEOEpic;

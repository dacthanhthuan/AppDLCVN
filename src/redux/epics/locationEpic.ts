import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {LOCATION} from '../actions/types';
import {
  locationListCityEnd,
  locationListCityFail,
  locationListDistrictEnd,
  locationListDistrictFail,
  locationListWardEnd,
  locationListWardFail,
} from '../actions/locationActions';
import api_list_all_city from '../../api/api_list_all_city';
import api_list_district_by_city_id from '../../api/api_list_district_by_city_id';
import api_list_ward_by_district_id from '../../api/api_list_ward_by_district_id';
import {riseNetworkError} from '../actions/errorHandlerActions';

const locationEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(
      LOCATION.LIST_CITY_START,
      LOCATION.LIST_DISTRICT_START,
      LOCATION.LIST_WARD_START,
    ),
    switchMap(async action => {
      switch (action.type) {
        case LOCATION.LIST_CITY_START:
          return await api_list_all_city(action.payload)
            .then(res => locationListCityEnd(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return locationListCityFail(msg);
            });
        case LOCATION.LIST_DISTRICT_START:
          return await api_list_district_by_city_id(action.payload)
            .then(res => locationListDistrictEnd(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return locationListDistrictFail(msg);
            });
        case LOCATION.LIST_WARD_START:
          return await api_list_ward_by_district_id(action.payload)
            .then(res => locationListWardEnd(res))
            .catch(msg => {
              if (msg instanceof Error) {
                return riseNetworkError({
                  error: msg,
                  visible: true,
                });
              }
              return locationListWardFail(msg);
            });
      }
    }),
  );

export default locationEpic;

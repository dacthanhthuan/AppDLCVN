import {switchMap, mergeMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {ADDRESS_BOOK} from '../actions/types';
import api_new_address_book from '../../api/api_new_address_book';
import {
  addressBookListAllEnd,
  addressBookListAllFail,
  addressBookNewEnd,
  addressBookNewFail,
  addressBookSetDefaultEnd,
  addressBookSetDefaultFail,
  addressBookUpdateEnd,
  addressBookUpdateFail,
} from '../actions/addressBookActions';
import api_update_address_book from '../../api/api_update_address_book';
import api_get_list_address_book from '../../api/api_get_list_address_book';
import api_set_default_address_book from '../../api/api_set_default_address_book';

const addressBookEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(
      ADDRESS_BOOK.NEW_START,
      ADDRESS_BOOK.UPDATE_START,
      ADDRESS_BOOK.LIST_ALL_START,
      ADDRESS_BOOK.SET_DEFAULT_START,
    ),
    mergeMap(async action => {
      switch (action.type) {
        case ADDRESS_BOOK.NEW_START:
          return await api_new_address_book(action.payload)
            .then(res => addressBookNewEnd(res))
            .catch(msg => addressBookNewFail(msg));
        case ADDRESS_BOOK.UPDATE_START:
          return await api_update_address_book(action.payload)
            .then(res => addressBookUpdateEnd(res))
            .catch(msg => addressBookUpdateFail(msg));
        case ADDRESS_BOOK.LIST_ALL_START:
          return await api_get_list_address_book(action.payload)
            .then(res => addressBookListAllEnd(res))
            .catch(msg => addressBookListAllFail(msg));
        case ADDRESS_BOOK.SET_DEFAULT_START:
          return await api_set_default_address_book(action.payload)
            .then(res => addressBookSetDefaultEnd(res))
            .catch(msg => addressBookSetDefaultFail(msg));
      }
    }),
  );

export default addressBookEpic;

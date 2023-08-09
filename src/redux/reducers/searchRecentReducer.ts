import {AnyAction} from 'redux';
import {SEARCH_RECENT} from '../actions/types';
import {storeData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';

type initialType = {
  data: any[];
};

const initialState: initialType = {
  data: [],
};

export default function searchRecentReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case SEARCH_RECENT.ADD: {
      let isExist = -1;
      let searchData = state.data.slice(0, 9);

      searchData.map((item, index) => {
        if (item === action.payload) {
          isExist = index;
        }
      });

      // if not exist in search data then
      if (isExist !== -1) {
        searchData = [
          ...searchData.slice(0, isExist),
          ...searchData.slice(isExist + 1, 9),
        ];
      }

      searchData.unshift(action.payload);

      storeData(LOCALSTORAGE.search_recent, {
        data: searchData,
      });

      return {
        ...state,
        data: searchData,
      };
    }
    case SEARCH_RECENT.REMOVE: {
      const searchData = state.data.filter(item => {
        return action.payload !== item;
      });

      storeData(LOCALSTORAGE.search_recent, {
        data: searchData,
      });

      return {
        ...state,
        data: searchData,
      };
    }
    case SEARCH_RECENT.MERGE: {
      return {
        ...state,
        data: [...action.payload],
      };
    }

    default:
      return state;
  }
}

import {SEARCH_RECENT} from './types';

export function addSearchRecent(search: string) {
  return {
    type: SEARCH_RECENT.ADD,
    payload: search,
  };
}

export function removeSearchRecent(search: string) {
  return {
    type: SEARCH_RECENT.REMOVE,
    payload: search,
  };
}

export function mergeSearch(data: string[]) {
  return {
    type: SEARCH_RECENT.MERGE,
    payload: data,
  };
}

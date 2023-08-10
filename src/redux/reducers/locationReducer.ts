import {LOCATION} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  city: [],
  district: [],
  ward: [],
  loading: false,
  message: undefined,
};

export default function locationReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case LOCATION.LIST_CITY_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOCATION.LIST_WARD_START: {
      return {
        ...state,
        loading: true,
        ward: [],
      };
    }
    case LOCATION.LIST_DISTRICT_START: {
      return {
        ...state,
        loading: true,
        district: [],
      };
    }

    case LOCATION.LIST_CITY_FAIL:
    case LOCATION.LIST_WARD_FAIL:
    case LOCATION.LIST_DISTRICT_FAIL: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }

    case LOCATION.LIST_CITY_END: {
      return {
        ...state,
        loading: false,
        city: action.payload,
        message: undefined,
      };
    }
    case LOCATION.LIST_WARD_END: {
      return {
        ...state,
        loading: false,
        ward: action.payload,
        message: undefined,
      };
    }
    case LOCATION.LIST_DISTRICT_END: {
      return {
        ...state,
        loading: false,
        district: action.payload,
        message: undefined,
      };
    }

    default: {
      return state;
    }
  }
}

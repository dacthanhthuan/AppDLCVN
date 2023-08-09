import {ADDRESS_BOOK} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  data: [],
  message: undefined,
  listLoading: false,
  updateState: false,
  newState: false,
  setDefaultState: false,
};

export default function addressBookReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    // start
    case ADDRESS_BOOK.NEW_START: {
      return {
        ...state,
        newState: true,
        listLoading: true,
      };
    }
    case ADDRESS_BOOK.UPDATE_START: {
      return {
        ...state,
        updateState: true,
        listLoading: true,
      };
    }
    case ADDRESS_BOOK.LIST_ALL_START: {
      return {
        ...state,
        listLoading: true,
      };
    }
    case ADDRESS_BOOK.SET_DEFAULT_START: {
      return {
        ...state,
        setDefaultState: true,
        listLoading: true,
      };
    }

    // end
    case ADDRESS_BOOK.NEW_END: {
      return {
        ...state,
        newState: false,
      };
    }
    case ADDRESS_BOOK.UPDATE_END: {
      return {
        ...state,
        updateState: false,
      };
    }
    case ADDRESS_BOOK.SET_DEFAULT_END: {
      return {
        ...state,
        setDefaultState: false,
      };
    }
    case ADDRESS_BOOK.LIST_ALL_END: {
      return {
        ...state,
        listLoading: false,
        data: action.payload,
      };
    }

    // fail
    case ADDRESS_BOOK.NEW_FAIL: {
      return {
        ...state,
        newState: false,
        message: action.payload,
        listLoading: false,
      };
    }
    case ADDRESS_BOOK.UPDATE_FAIL: {
      return {
        ...state,
        updateState: false,
        message: action.payload,
        listLoading: false,
      };
    }
    case ADDRESS_BOOK.LIST_ALL_FAIL: {
      return {
        ...state,
        listLoading: false,
        message: action.payload,
      };
    }
    case ADDRESS_BOOK.SET_DEFAULT_FAIL: {
      return {
        ...state,
        setDefaultState: false,
        message: action.payload,
        listLoading: false,
      };
    }

    // clear
    case ADDRESS_BOOK.ADDRESS_CLEAR: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

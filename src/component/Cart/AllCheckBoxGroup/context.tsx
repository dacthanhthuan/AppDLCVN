import {createContext, useReducer, Dispatch, useContext} from 'react';

const initialState = {
  all_check: false,
  force_change: false,
  checkboxs: [],
};

enum AllCheckActionType {
  CHANGE_ALL_CHECK_STATE,
  CHANGE_ALL_CHECK_NOT_FORCHANGE,
  ADD_CHECKBOX,
  REMOVE_CHECKBOX,
}

const AllCheckContext = createContext(null);

const AllCheckDispatchContext = createContext<Dispatch<any> | any>(null);

export function AllCheckProvider({children}: any) {
  const [allcheck, dispatch] = useReducer(AllCheckReducer, initialState);

  return (
    <AllCheckContext.Provider value={allcheck}>
      <AllCheckDispatchContext.Provider value={dispatch}>
        {children}
      </AllCheckDispatchContext.Provider>
    </AllCheckContext.Provider>
  );
}

export function useAllCheck() {
  return useContext(AllCheckContext);
}

export function useDispatchAllCheck() {
  return useContext(AllCheckDispatchContext);
}

function AllCheckReducer(state: any, action: any) {
  switch (action.type) {
    case AllCheckActionType.CHANGE_ALL_CHECK_STATE: {
      return {
        ...state,
        all_check: action.payload,
        force_change: true,
      };
    }

    case AllCheckActionType.CHANGE_ALL_CHECK_NOT_FORCHANGE: {
      return {
        ...state,
        all_check: action.payload,
        force_change: false,
      };
    }

    case AllCheckActionType.ADD_CHECKBOX: {
      return {
        ...state,
        checkboxs: [...state.checkboxs, action.payload],
      };
    }

    case AllCheckActionType.REMOVE_CHECKBOX: {
      return {
        ...state,
        checkboxs: state.checkboxs.filter((item: any) => {
          return item !== action.payload;
        }),
      };
    }
    default:
      return state;
  }
}

export const AllCheckActions = {
  Change_All_Check_State: (state: boolean) => ({
    type: AllCheckActionType.CHANGE_ALL_CHECK_STATE,
    payload: state,
  }),
  Change_All_Check_Not_Force_Change: (state: boolean) => ({
    type: AllCheckActionType.CHANGE_ALL_CHECK_NOT_FORCHANGE,
    payload: state,
  }),
  Add_Check_Box: (unique: string | number) => ({
    type: AllCheckActionType.ADD_CHECKBOX,
    payload: unique,
  }),
  Remove_Check_Box: (unique: string | number) => ({
    type: AllCheckActionType.REMOVE_CHECKBOX,
    payload: unique,
  }),
};

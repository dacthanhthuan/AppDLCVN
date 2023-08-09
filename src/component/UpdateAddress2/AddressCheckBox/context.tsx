import {createContext, useReducer, Dispatch, useContext} from 'react';

const initialState = {
  buttonSelect: 'city',
  city: {
    name: 'Tỉnh/Thành phố',
    type: 'Tỉnh',
    subdivision: 'city',
  },
  district: {
    name: 'Quận/Huyện',
    type: 'Quận',
    subdivision: 'district',
  },
  ward: {
    name: 'Phường/Xã',
    type: 'Xã',
    subdivision: 'ward',
  },
};

enum AddressCheckBoxActionType {
  BUTTON_SELECT,
  LIST_SELECT_CITY,
  LIST_SELECT_DISTRICT,
  LIST_SELECT_WARD,
}

const AddressCheckBoxContext = createContext<any>(null);

const AddressCheckBoxDispatchContext = createContext<Dispatch<any> | any>(null);

export function AddressCheckBoxProvider({children}: any) {
  const [select, dispatch] = useReducer(AddressCheckBoxReducer, initialState);

  return (
    <AddressCheckBoxContext.Provider value={select}>
      <AddressCheckBoxDispatchContext.Provider value={dispatch}>
        {children}
      </AddressCheckBoxDispatchContext.Provider>
    </AddressCheckBoxContext.Provider>
  );
}

function AddressCheckBoxReducer(state: any, action: any) {
  switch (action.type) {
    case AddressCheckBoxActionType.BUTTON_SELECT: {
      return {
        ...state,
        buttonSelect: action.payload,
      };
    }
    case AddressCheckBoxActionType.LIST_SELECT_CITY: {
      return {
        ...state,
        city: {...action.payload, subdivision: 'city'},
        district: {
          name: 'Quận/Huyện',
          type: 'Quận',
          subdivision: 'district',
        },
        ward: {
          name: 'Phường/Xã',
          type: 'Xã',
          subdivision: 'ward',
        },
      };
    }
    case AddressCheckBoxActionType.LIST_SELECT_DISTRICT: {
      return {
        ...state,
        district: {...action.payload, subdivision: 'district'},
        ward: {
          name: 'Phường/Xã',
          type: 'Xã',
          subdivision: 'ward',
        },
      };
    }
    case AddressCheckBoxActionType.LIST_SELECT_WARD: {
      return {
        ...state,
        ward: {...action.payload, subdivision: 'ward'},
      };
    }
    default:
      return state;
  }
}

export const useAddressCheckBox = () => {
  return useContext(AddressCheckBoxContext);
};

export const useAddressCheckBoxDispatch = () => {
  return useContext(AddressCheckBoxDispatchContext);
};

export const AddressCheckBoxActions = {
  selectButton: (select: string) => ({
    type: AddressCheckBoxActionType.BUTTON_SELECT,
    payload: select,
  }),
  selectListCity: (city: any) => ({
    type: AddressCheckBoxActionType.LIST_SELECT_CITY,
    payload: city,
  }),
  selectListDistrict: (district: any) => ({
    type: AddressCheckBoxActionType.LIST_SELECT_DISTRICT,
    payload: district,
  }),
  selectListWard: (ward: any) => ({
    type: AddressCheckBoxActionType.LIST_SELECT_WARD,
    payload: ward,
  }),
};

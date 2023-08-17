import {createContext, useReducer, Dispatch, useContext} from 'react';
import SupplierProductsList from '.';

const initialState = {
  visible: false,
  supplier: undefined,
};

enum SupplierProductsListActionsType {
  RISE = 'rise supplier products list',
  HIDE = 'hide supplier products list',
  CLEAR = 'clear supplier products list',
}

const SupplierProductsListContext = createContext<any>(null);

const SupplierProductsListDispatchContext = createContext<Dispatch<any> | any>(
  null,
);

export function SupplierProductsListProvider({children}: any) {
  const [products, dispatch] = useReducer(Reducer, initialState);

  return (
    <SupplierProductsListContext.Provider value={products}>
      <SupplierProductsListDispatchContext.Provider value={dispatch}>
        {children}
        <SupplierProductsList visible={products.visible} />
      </SupplierProductsListDispatchContext.Provider>
    </SupplierProductsListContext.Provider>
  );
}

function Reducer(state: any, action: any) {
  switch (action.type) {
    case SupplierProductsListActionsType.RISE: {
      return {
        ...state,
        visible: true,
        supplier: action.payload ? action.payload : state.supplier,
      };
    }

    case SupplierProductsListActionsType.HIDE: {
      return {
        ...state,
        visible: false,
      };
    }

    case SupplierProductsListActionsType.CLEAR: {
      return {
        ...state,
        visible: false,
        supplier: undefined,
      };
    }

    default:
      return state;
  }
}

export const useSupplierProductsDispatch = () => {
  return useContext(SupplierProductsListDispatchContext);
};

export const useSupplierProductsContext = () => {
  return useContext(SupplierProductsListContext);
};

export const riseSupplierProductsList = (data: any) => {
  return {
    type: SupplierProductsListActionsType.RISE,
    payload: data,
  };
};

export const hideSupplierProductsList = () => {
  return {
    type: SupplierProductsListActionsType.HIDE,
  };
};

export const clrSupplierProductList = () => {
  return {
    type: SupplierProductsListActionsType.CLEAR,
  };
};

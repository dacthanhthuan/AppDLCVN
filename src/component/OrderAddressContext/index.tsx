import {createContext, Dispatch, useContext} from 'react';
import {useImmerReducer} from 'use-immer';
import {InitialStateType, ORDER_ADDRESS, ShipAddressType} from './types';

const initialState: InitialStateType = {
  address: undefined,
};

const OrderAddressContext = createContext<any>(null);

const OrderAddressDispatchContext = createContext<Dispatch<any> | any>(null);

export function OrderAddressProvider({children}: any) {
  const [orderAddress, dispatch] = useImmerReducer(Reducer, initialState);

  return (
    <OrderAddressContext.Provider value={orderAddress}>
      <OrderAddressDispatchContext.Provider value={dispatch}>
        {children}
      </OrderAddressDispatchContext.Provider>
    </OrderAddressContext.Provider>
  );
}

function Reducer(draft: any, action: any) {
  switch (action.type) {
    case ORDER_ADDRESS.update: {
      draft.address = action.payload;
      break;
    }

    case ORDER_ADDRESS.clear: {
      return initialState;
    }
  }
}

export const useOrderAddress = () => {
  return useContext(OrderAddressContext);
};

export const useOrderAddressDispatch = () => {
  return useContext(OrderAddressDispatchContext);
};

export const OrderAddressActions = {
  update: (data: ShipAddressType) => ({
    type: ORDER_ADDRESS.update,
    payload: data,
  }),
  clear: () => ({
    type: ORDER_ADDRESS.clear,
  }),
};

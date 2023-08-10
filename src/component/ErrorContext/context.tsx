/**
 * Ý tưởng: triển khai một Context có khả năng hiển thị error component ở bất kì đâu trong ứng dụng.
 * Bằng việc triển khai một Context và sử dụng Provider của context này bao bọc entry file (index.js). Sau đó có thể sử dụng dispatch của context để thực hiện hiển thị error ở bất kì đâu trong ứng dụng.
 */
import {createContext, useReducer, Dispatch, useContext} from 'react';
import NormalErrorQueue from './NormalErrorQueue';

enum ERROR {
  RISE = 'Rise_error',
  HIDE = 'Hide_error',
}

export enum ErrorType {
  NETWORK = 'NETWORK_ERROR',
  NORMAL = 'NORMAL_ERROR',
}

type ErrorProps = {
  error?: string;
  type?: ErrorType;
  duration?: number;
  visible?: boolean;
};

type RiseErrorType = Omit<ErrorProps, 'visible'>;

type StateType = {
  normal: RiseErrorType[];
};

const initialState: StateType = {
  normal: [],
};

const ErrorContext = createContext<any>(null);

const ErrorDispatchContext = createContext<Dispatch<any> | any>(null);

export function ErrorProvider({children}: any) {
  const [error, dispatch] = useReducer(ErrorReducer, initialState);

  return (
    <ErrorContext.Provider value={error}>
      <ErrorDispatchContext.Provider value={dispatch}>
        {children}
        <NormalErrorQueue />
      </ErrorDispatchContext.Provider>
    </ErrorContext.Provider>
  );
}

function ErrorReducer(state = initialState, action: any) {
  switch (action.type) {
    case ERROR.RISE: {
      let queue = [...state.normal];

      if (action.payload.type === ErrorType.NORMAL) {
        if (action.payload.error !== queue[queue.length - 1]?.error) {
          queue = [
            ...queue,
            {
              error: action.payload.error,
              duration: action.payload.duration,
              type: action.payload.type,
            },
          ];
        }
      }

      return {
        ...state,
        normal: queue,
      };
    }

    case ERROR.HIDE: {
      let queue = [...state.normal];
      queue.shift();

      return {
        ...state,
        normal: queue,
      };
    }

    default:
      return state;
  }
}

export const useError = () => {
  return useContext(ErrorContext);
};

export const useErrorDispatch = () => {
  return useContext(ErrorDispatchContext);
};

export const ErrorActions = {
  rise: (data: RiseErrorType) => ({
    type: ERROR.RISE,
    payload: data,
  }),

  hide: () => ({
    type: ERROR.HIDE,
  }),
};

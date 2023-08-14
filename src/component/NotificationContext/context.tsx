/**
 * Ý tưởng: triển khai một Context có khả năng hiển thị notification component ở bất kì đâu trong ứng dụng.
 * Bằng việc triển khai một Context và sử dụng Provider của context này bao bọc entry file (index.js). Sau đó có thể sử dụng dispatch của context để thực hiện hiển thị notification ở bất kì đâu trong ứng dụng.
 */
import {createContext, useReducer, Dispatch, useContext} from 'react';
import {
  InitialStateType,
  NOTIFICATION,
  NotificationProps,
  NotificationType,
} from './types';
import NotificationQueue from '../Notification/NotificationQueue';

const initialState: InitialStateType = {
  data: [],
};

const NotificationContext = createContext<any>(null);

const NotificationDispatchContext = createContext<Dispatch<any> | any>(null);

export function NotificationProvider({children}: any) {
  const [nofitication, dispatch] = useReducer(
    NotificationReducer,
    initialState,
  );

  return (
    <NotificationContext.Provider value={nofitication}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
        <NotificationQueue />
      </NotificationDispatchContext.Provider>
    </NotificationContext.Provider>
  );
}

function NotificationReducer(state = initialState, action: any) {
  switch (action.type) {
    case NOTIFICATION.RISE: {
      let queue = [...state.data];

      if (action.payload.type === NotificationType.NORMAL) {
        if (
          action.payload.data.message !== queue[queue.length - 1]?.data.message
        ) {
          queue = [
            ...queue,
            {
              data: action.payload.data,
              duration: action.payload.duration,
              type: action.payload.type,
            },
          ];
        }
      }

      return {
        ...state,
        data: queue,
      };
    }

    case NOTIFICATION.HIDE: {
      let queue = [...state.data];
      queue.shift();

      return {
        ...state,
        data: queue,
      };
    }

    default:
      return state;
  }
}

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const useNotificationDispatch = () => {
  return useContext(NotificationDispatchContext);
};

export const NotificationActions = {
  rise: (data: NotificationProps) => ({
    type: NOTIFICATION.RISE,
    payload: data,
  }),

  hide: () => ({
    type: NOTIFICATION.HIDE,
  }),
};

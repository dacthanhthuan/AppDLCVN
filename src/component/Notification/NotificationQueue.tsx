import {useCallback, useEffect, useState} from 'react';
import NormalNotification from './NormalNotification';
import {
  NotificationActions,
  useNotification,
  useNotificationDispatch,
} from '../NotificationContext/context';

export default function NotificationQueue() {
  const notification = useNotification();
  const dispatch = useNotificationDispatch();
  // get data from notification state
  const queue = notification.data;
  const data = notification.data[0];

  // declare local state
  const [visible, setVisible] = useState(false); // define when notification is show or hide
  const [initialRender, setInitialRender] = useState(true); // initial rendered state
  let visibleTimout: number; // timout define visible state
  let animateTimout: number; // timeout define duration animate between 2 notification

  // timer visible state
  const visibleTimer = useCallback(() => {
    visibleTimout = setTimeout(() => {
      setVisible(false);

      clearTimeout(visibleTimout);
    }, data.duration);
  }, [data]);

  // timer animate between 2 error
  const animateTimer = useCallback(() => {
    animateTimout = setTimeout(() => {
      dispatch(NotificationActions.hide());

      clearTimeout(animateTimout);
    }, 200);
  }, []);

  // whenever visible state change
  useEffect(() => {
    // if notification is hidden
    if (!visible && !initialRender) {
      animateTimer();
    }

    // if notification is showed
    if (visible && !initialRender) {
      visibleTimer();
    }

    //
    setInitialRender(false);
  }, [visible]);

  // whenever queue length has changed
  useEffect(() => {
    // if queue length is greater 0
    if (queue.length > 0) {
      setVisible(true);
    }
  }, [queue.length]);

  return visible ? (
    <NormalNotification notification={data.data.message} />
  ) : null;
}

import NormalError from './NormalError';
import {ErrorActions, useError, useErrorDispatch} from './context';
import {useCallback, useEffect, useState} from 'react';

export default function NormalErrorQueue() {
  const error = useError();
  const dispatch = useErrorDispatch();
  // get data from error state
  const queue = error.normal;
  const errorData = error.normal[0];

  // declare local state
  const [visible, setVisible] = useState(false); // define when error is show or hide
  const [initialRender, setInitialRender] = useState(true); // initial rendered state
  let visibleTimout: number; // timout define visible state
  let animateTimout: number; // timeout define duration animate between 2 error

  // timer visible state
  const visibleTimer = useCallback(() => {
    visibleTimout = setTimeout(() => {
      setVisible(false);

      clearTimeout(visibleTimout);
    }, errorData.duration);
  }, [errorData]);

  // timer animate between 2 error
  const animateTimer = useCallback(() => {
    animateTimout = setTimeout(() => {
      dispatch(ErrorActions.hide());

      clearTimeout(animateTimout);
    }, 100);
  }, []);

  // whenever visible state change
  useEffect(() => {
    // if error is hidden
    if (!visible && !initialRender) {
      animateTimer();
    }

    // if error is showed
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

  return visible ? <NormalError error={errorData.error} /> : null;
}

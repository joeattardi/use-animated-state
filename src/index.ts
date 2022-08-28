import { useState, useRef } from 'react';

type AnimatedStateReturnValue = {
  isVisible: boolean;
  show: () => void;
  hide: () => Promise<void>;
  toggle: () => Promise<void>;
  ref: (element: HTMLElement | null) => void;
};

export default function useAnimatedState(initialValue: boolean): AnimatedStateReturnValue {
  const [isVisible, setVisible] = useState<boolean>(initialValue);

  const elementRef = useRef<HTMLElement | null>(null);

  const callbackRef = (element: HTMLElement | null) => {
    elementRef.current = element;
    element?.animate({ opacity: [0, 1] }, { duration: 250, fill: 'both' });
  }

  const show = () => setVisible(true);
  const hide = async () => {
    await elementRef.current?.animate({ opacity: [1, 0] }, { duration: 250, fill: 'both' }).finished;
    setVisible(false);
  }

  const toggle = async () => {
    if (isVisible) {
      return hide();
    }

    return show();
  }

  return {
    isVisible,
    show,
    hide,
    toggle,
    ref: callbackRef
  };
}

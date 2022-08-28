import { useState, useRef } from 'react';

type KeyframeDefinitions = {
  visible: Keyframe;
  hidden: Keyframe;
}

type AnimatedStateReturnValue = {
  isVisible: boolean;
  show: () => void;
  hide: () => Promise<void>;
  toggle: () => Promise<void>;
  ref: (element: HTMLElement | null) => void;
};

type Options = KeyframeAnimationOptions & {
  animateInitialMount?: boolean;
}

// TODO: 
// - avoid 'state update on unmounted component' error if unmounted while animating
// - handle when a state change is made while previous animation is still in progress. Wait for it? Cancel?

export default function useAnimatedState(
  initialValue: boolean, 
  keyframes: KeyframeDefinitions, 
  options: Options): AnimatedStateReturnValue {
  const [isVisible, setVisible] = useState<boolean>(initialValue);
  const initialMountRef = useRef(true);
  const elementRef = useRef<HTMLElement | null>(null);

  const callbackRef = (element: HTMLElement | null) => {
    elementRef.current = element;

    if (initialMountRef.current && options.animateInitialMount === false) {
      initialMountRef.current = false;
      return;
    }

    element?.animate([
      keyframes.hidden,
      keyframes.visible
    ], options);
  }

  const show = () => setVisible(true);
  const hide = async () => {
    await elementRef.current?.animate([
      keyframes.visible,
      keyframes.hidden
    ], options).finished;
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

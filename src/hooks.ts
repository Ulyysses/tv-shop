import { RefObject, useEffect } from "react";

export const usePosition = (condition: boolean, ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (condition) {
      ref.current?.focus();
    }
  }, [condition, ref]);
};

export const useKeyboardEvent = (
  eventHandler: (event: KeyboardEvent) => void
) => {
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      eventHandler(event);
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [eventHandler]);
};

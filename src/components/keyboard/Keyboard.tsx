import { ReactNode, useCallback, useContext, useRef } from "react";

import KeyboardContext from "../../context/keyboard-context";
import NavigationBoardContext from "../../context/navigation-context";

import css from "./index.module.css";
import { useKeyboardEvent, usePosition } from "../../hooks";

interface IKeyboard {
  setPhoneNumber: (value: string) => void;
  phoneNumber: string;
  children: ReactNode;
}

interface INumber {
  number: string;
}

type NumberToPositionMap = {
  [key: string]: {
    x: number;
    y: number;
  };
};

const numberToPositionMap: NumberToPositionMap = {
  "1": { x: 0, y: 0 },
  "2": { x: 1, y: 0 },
  "3": { x: 2, y: 0 },
  "4": { x: 0, y: 1 },
  "5": { x: 1, y: 1 },
  "6": { x: 2, y: 1 },
  "7": { x: 0, y: 2 },
  "8": { x: 1, y: 2 },
  "9": { x: 2, y: 2 },
  "0": { x: 2, y: 3 },
};

const Number = ({ number }: INumber) => {
  const position = useContext(NavigationBoardContext);
  const { setPhoneNumber, phoneNumber } = useContext(KeyboardContext);
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleNumberClick = () => {
    const newPhoneNumber = phoneNumber.replace("_", number.toString());
    setPhoneNumber(newPhoneNumber);
  };

  const keyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      const keyAsNumber = parseInt(event.key, 10);
      if (!isNaN(keyAsNumber)) {
        setPhoneNumber(phoneNumber.replace("_", keyAsNumber.toString()));
      }
    },
    [phoneNumber, setPhoneNumber]
  );

  useKeyboardEvent(keyboardEvent);

  const correctPosition = numberToPositionMap[number];

  const condition =
    correctPosition &&
    position.x === correctPosition.x &&
    position.y === correctPosition.y;

  usePosition(condition, ref);

  return (
    <button
      type="button"
      onClick={handleNumberClick}
      className={css.number_button}
      ref={ref}
    >
      {number}
    </button>
  );
};

const Clear = () => {
  const position = useContext(NavigationBoardContext);
  const { setPhoneNumber, phoneNumber } = useContext(KeyboardContext);
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleClearClick = () => {
    const reversePhoneNumber = phoneNumber.split("").reverse().join("");
    const newPhoneNumber = reversePhoneNumber
      .replace(/\d(?!\+)/, "_")
      .split("")
      .reverse()
      .join("");
    setPhoneNumber(newPhoneNumber);
  };

  const keyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        const reversePhoneNumber = phoneNumber.split("").reverse().join("");
        const newPhoneNumber = reversePhoneNumber
          .replace(/\d(?!\+)/, "_")
          .split("")
          .reverse()
          .join("");
        setPhoneNumber(newPhoneNumber);
      }
    },
    [phoneNumber, setPhoneNumber]
  );

  useKeyboardEvent(keyboardEvent);

  const condition = position.x >= 0 && position.x <= 1 && position.y === 3;

  usePosition(condition, ref);

  return (
    <button
      type="button"
      onClick={handleClearClick}
      className={css.clear_button}
      ref={ref}
    >
      Стереть
    </button>
  );
};

const Keyboard = ({ setPhoneNumber, phoneNumber, children }: IKeyboard) => {
  return (
    <KeyboardContext.Provider value={{ setPhoneNumber, phoneNumber }}>
      <div className={css.keyboard_container}>{children}</div>
    </KeyboardContext.Provider>
  );
};

Keyboard.Number = Number;
Keyboard.Clear = Clear;

export default Keyboard;

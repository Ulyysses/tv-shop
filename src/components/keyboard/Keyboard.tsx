import { ReactNode, useContext, useEffect } from "react";
import KeyboardContext from "../../context";
import "./Keyboard.css";

interface IKeyboard {
  setPhoneNumber: (value: string) => void;
  phoneNumber: string;
  children: ReactNode;
}

interface INumber {
  number: number;
}

const Number = ({ number }: INumber) => {
  const { setPhoneNumber, phoneNumber } = useContext(KeyboardContext);
  const handleNumberClick = () => {
    const newPhoneNumber = phoneNumber.replace("_", number.toString());
    setPhoneNumber(newPhoneNumber);
  };

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      const keyAsNumber = parseInt(event.key, 10);
      if (!isNaN(keyAsNumber))
        setPhoneNumber(phoneNumber.replace("_", keyAsNumber.toString()));
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [phoneNumber, setPhoneNumber]);

  return (
    <button type="button" onClick={handleNumberClick} className="number_button">
      {number}
    </button>
  );
};

const Clear = () => {
  const { setPhoneNumber, phoneNumber } = useContext(KeyboardContext);
  const handleClearClick = () => {
    const reversePhoneNumber = phoneNumber.split("").reverse().join("");
    const newPhoneNumber = reversePhoneNumber
      .replace(/\d(?!\+)/, "_")
      .split("")
      .reverse()
      .join("");
    setPhoneNumber(newPhoneNumber);
  };

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        const reversePhoneNumber = phoneNumber.split("").reverse().join("");
        const newPhoneNumber = reversePhoneNumber
          .replace(/\d(?!\+)/, "_")
          .split("")
          .reverse()
          .join("");
        setPhoneNumber(newPhoneNumber);
      }
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [phoneNumber, setPhoneNumber]);

  return (
    <button type="button" onClick={handleClearClick} className="clear_button">
      Стереть
    </button>
  );
};

const Keyboard = ({ setPhoneNumber, phoneNumber, children }: IKeyboard) => {
  return (
    <KeyboardContext.Provider value={{ setPhoneNumber, phoneNumber }}>
      <div className="keyboard_container">{children}</div>
    </KeyboardContext.Provider>
  );
};

Keyboard.Number = Number;
Keyboard.Clear = Clear;

export default Keyboard;

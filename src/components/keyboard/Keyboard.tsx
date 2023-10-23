import { ReactNode, useContext } from "react";
import KeyboardContext from "../../context";

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
  return (
    <button type="button" onClick={handleNumberClick}>
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
  return (
    <button type="button" onClick={handleClearClick}>
      Стереть
    </button>
  );
};

const Keyboard = ({ setPhoneNumber, phoneNumber, children }: IKeyboard) => {
  return (
    <KeyboardContext.Provider value={{ setPhoneNumber, phoneNumber }}>
      {children}
    </KeyboardContext.Provider>
  );
};

Keyboard.Number = Number;
Keyboard.Clear = Clear;

export default Keyboard;

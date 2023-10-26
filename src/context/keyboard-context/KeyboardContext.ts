import { createContext } from "react";

const KeyboardContext = createContext({
  setPhoneNumber: (string: string) => {
    console.log(string);
  },
  phoneNumber: ''
});

export default KeyboardContext;

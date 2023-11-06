import { useCallback, useContext, useEffect, useRef, useState } from "react";

import Keyboard from "../keyboard";
import NavigationBoardContext from "../../context/navigation-context/NavigationBoardContext";

import css from "./index.module.css";
import { useKeyboardEvent, usePosition } from "../../hooks";

interface IForm {
  isFormActive: boolean;
  setIsFormActive: (value: boolean) => void;
}

export const Form = ({ isFormActive, setIsFormActive }: IForm) => {
  const [phoneNumber, setPhoneNumber] = useState("+7(___)___-__-__");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isFormNotCompeleted, setIsFormNotCompeleted] = useState(true);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [isActiveSubmitButton, setIsActiveSubmitButton] = useState(false);

  const refSubmitButton = useRef<HTMLButtonElement | null>(null);
  const refCloseButton = useRef<HTMLButtonElement | null>(null);
  const refCheckbox = useRef<HTMLInputElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const position = useContext(NavigationBoardContext);

  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  const condition = position.x >= 0 && position.x <= 2;
  const refCheckboxCondition = condition && position.y === 4;
  const refSubmitButtonCondition = condition && position.y === 5;
  const refCloseButtonCondition = condition && position.y === 6;

  usePosition(refCheckboxCondition, refCheckbox);
  usePosition(refSubmitButtonCondition, refSubmitButton);
  usePosition(refCloseButtonCondition, refCloseButton);

  const toggleFormVisibility = () => {
    if (isActiveSubmitButton) {
      setIsFormNotCompeleted(false);
    }

    if (phoneNumber.includes("_")) {
      setInvalidPhoneNumber(true);
    } else {
      setInvalidPhoneNumber(false);
    }
  };

  const handleVideoPlay = () => {
    setIsFormActive(false);
    setIsFormNotCompeleted(true);
    setPhoneNumber("+7(___)___-__-__");
  };

  const changeNumber = useCallback((newNumber: string) => {
    setPhoneNumber(newNumber);
    setInvalidPhoneNumber(false);
  }, []);

  const keyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        refCheckbox.current === document.activeElement
      ) {
        setIsCheckboxChecked(!isCheckboxChecked);
      }
    },
    [isCheckboxChecked]
  );

  useKeyboardEvent(keyboardEvent);

  useEffect(() => {
    const fullNumber = /^\d{11}$/;
    if (fullNumber.test(cleanedNumber) && isCheckboxChecked) {
      setIsActiveSubmitButton(true);
    } else {
      setIsActiveSubmitButton(false);
    }
  }, [isCheckboxChecked, cleanedNumber]);

  useEffect(() => {
    const resetTimer = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      const newTimer = setTimeout(() => {
        setIsFormActive(false);
      }, 10000);
      timer.current = newTimer;
    };
    resetTimer();

    window.addEventListener("keydown", resetTimer);
    window.addEventListener("mousemove", resetTimer);

    return () => {
      window.removeEventListener("keydown", resetTimer);
      window.addEventListener("mousemove", resetTimer);
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [setIsFormActive, timer]);

  useEffect(() => {
    if (refCloseButton.current && !isFormNotCompeleted) {
      refCloseButton.current.focus();
    }
  }, [isFormNotCompeleted]);

  return (
    <>
      {isFormActive && (
        <div className={css.form_container}>
          {isFormNotCompeleted ? (
            <form className={css.form}>
              <h1 className={css.form_title}>
                Введите ваш номер мобильного телефона
              </h1>
              <p
                className={
                  invalidPhoneNumber ? css.form_number_invalid : css.form_number
                }
              >
                {phoneNumber}
              </p>
              <p className={css.form_text}>
                и с Вами свяжется наш менеджер для дальнейшей консультации
              </p>
              <Keyboard setPhoneNumber={changeNumber} phoneNumber={phoneNumber}>
                <Keyboard.Number number={"1"} />
                <Keyboard.Number number={"2"} />
                <Keyboard.Number number={"3"} />
                <Keyboard.Number number={"4"} />
                <Keyboard.Number number={"5"} />
                <Keyboard.Number number={"6"} />
                <Keyboard.Number number={"7"} />
                <Keyboard.Number number={"8"} />
                <Keyboard.Number number={"9"} />
                <Keyboard.Clear />
                <Keyboard.Number number={"0"} />
              </Keyboard>
              {invalidPhoneNumber ? (
                <p className={css.invalid_number_message}>
                  Неверно введен номер
                </p>
              ) : (
                <label htmlFor="data" className={css.check}>
                  <input
                    type="checkbox"
                    id="data"
                    name="data"
                    className={css.input_checkbox}
                    checked={isCheckboxChecked}
                    onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                    ref={refCheckbox}
                  />
                  <span className={css.checkbox}></span>
                  Согласие на обработку персональных данных
                </label>
              )}
              <button
                className={
                  isActiveSubmitButton
                    ? css.submit_button_active
                    : css.submit_button
                }
                onClick={toggleFormVisibility}
                type="button"
                ref={refSubmitButton}
              >
                Подтвердить номер
              </button>
            </form>
          ) : (
            <div className={css.form_after}>
              <h2 className={css.after_title}>Заявка принята</h2>
              <p className={css.after_text}>Держите телефон под рукой.</p>
              <p className={css.after_text}>
                Скоро с Вами свяжется наш менеджер.
              </p>
            </div>
          )}

          <button
            className={
              isFormNotCompeleted ? css.close_button : css.close_button_active
            }
            onClick={handleVideoPlay}
            ref={refCloseButton}
          >
            Х
          </button>
        </div>
      )}
    </>
  );
};

export default Form;

import { useEffect, useRef, useState } from "react";
import "./Form.css";
import Keyboard from "../keyboard";
import PromoVideo from "../promo-video";

export const Form = () => {
  const [phoneNumber, setPhoneNumber] = useState("+7(___)___-__-__");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isFormNotCompeleted, setIsFormNotCompeleted] = useState(true);
  const [isFormActive, setIsFormActive] = useState(false);

  const refVideo = useRef<HTMLVideoElement | null>(null);

  const fullNumber = /^\d{11}$/;
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  const checkedCheckbox = isCheckboxChecked;

  const formButton =
    fullNumber.test(cleanedNumber) && checkedCheckbox
      ? "form_button_active"
      : "form_button";

  let closeButton = "close_button";

  const toggleFormVisibility = () => {
    if (formButton === "form_button_active") {
      setIsFormNotCompeleted(false);
    }
  };

  if (!isFormNotCompeleted) {
    closeButton = "close_button_active";
  } else {
    closeButton = "close_button";
  }

  const handleVideoPlay = () => {
    setIsFormActive(false);
    setIsFormNotCompeleted(true);
    setPhoneNumber("+7(___)___-__-__");
  };

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  }, [timer]);

  return (
    <>
      <PromoVideo
        refVideo={refVideo}
        isFormActive={isFormActive}
        setIsFormActive={setIsFormActive}
        hiddenStyle={isFormActive ? "none" : ""}
      />

      {isFormActive ? (
        <div className="form_container">
          {isFormNotCompeleted ? (
            <form action="" method="post" className="form">
              <h1 className="form_title">
                Введите ваш номер мобильного телефона
              </h1>
              <p className="form_number">{phoneNumber}</p>
              <p className="form_text">
                и с Вами свяжется наш менеджер для дальнейшей консультации
              </p>
              <Keyboard
                setPhoneNumber={setPhoneNumber}
                phoneNumber={phoneNumber}
              >
                <Keyboard.Number number={1} />
                <Keyboard.Number number={2} />
                <Keyboard.Number number={3} />
                <Keyboard.Number number={4} />
                <Keyboard.Number number={5} />
                <Keyboard.Number number={6} />
                <Keyboard.Number number={7} />
                <Keyboard.Number number={8} />
                <Keyboard.Number number={9} />
                <Keyboard.Clear />
                <Keyboard.Number number={0} />
              </Keyboard>
              <label htmlFor="data" className="check">
                <input
                  type="checkbox"
                  id="data"
                  name="data"
                  className="input_checkbox"
                  checked={isCheckboxChecked}
                  onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                />
                <span className="checkbox"></span>
                Согласие на обработку персональных данных
              </label>
              <button
                className={formButton}
                onClick={toggleFormVisibility}
                type="button"
              >
                Подтвердить номер
              </button>
            </form>
          ) : (
            <div className="form_after">
              <h2 className="after_title">Заявка принята</h2>
              <p className="after_text">Держите телефон под рукой.</p>
              <p className="after_text">Скоро с Вами свяжется наш менеджер.</p>
            </div>
          )}

          <button className={closeButton} onClick={handleVideoPlay}>
            Х
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Form;

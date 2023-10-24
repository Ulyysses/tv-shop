import { useState } from "react";
import "./Form.css";
import Keyboard from "../keyboard";

export const Form = () => {
  const [phoneNumber, setPhoneNumber] = useState("+7(___)___-__-__");
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
    <div className="form_container">
      <form action="" method="post" className="form">
        <h1 className="form_title">Введите ваш номер мобильного телефона</h1>
        <p className="form_number">{phoneNumber}</p>
        <p>и с Вами свяжется наш менеджер для дальнейшей консультации</p>
        <Keyboard setPhoneNumber={setPhoneNumber} phoneNumber={phoneNumber}>
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
          />
          <span className="checkbox"></span>
          Согласие на обработку персональных данных
        </label>
        <button className="form_button">Подтвердить номер</button>
      </form>
    </div>
  );
};

export default Form;

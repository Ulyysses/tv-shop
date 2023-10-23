import { useState } from "react";
import "./Form.css";
export const Form = () => {
  const [phoneNumber, setPhoneNumber] = useState("+7(___)___-__-__");

  return (
    <div className="form_container">
      <form action="" method="post" className="form">
        <h1 className="form_title">Введите ваш номер мобильного телефона</h1>
        <p className="form_number">{phoneNumber}</p>
        <p>и с Вами свяжется наш менеджер для дальнейшей консультации</p>
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

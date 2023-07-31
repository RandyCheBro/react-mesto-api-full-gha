import React from 'react';
import errorIcon from '../images/errorIcon.svg'
import successIcon from '../images/successIcon.svg'

function InfoTooltip({ isOpen, onClose, isSuccess }) {


  return (
    <div className={`popup popup_type_tooltip ${isOpen ? `popup_is-opened` : ""}`}>
      <div className="popup__container">
        <img src={isSuccess ? successIcon : errorIcon} className='popup__image-tooltip' alt='подсказка' />
        <h3 className="popup__title-success">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h3>
        <button onClick={onClose} className="popup__close" type="button" aria-label="закрытие"></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
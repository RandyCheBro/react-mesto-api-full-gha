import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_is-opened` : ""}`}>
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <form onSubmit={props.onSubmit} action="#" className={`popup__form popup__form_${props.name}`} name={props.name} method="post" >
          {props.children}
          <button type="submit" className="popup__submit">
            {props.buttonText}
          </button>
        </form>
        <button onClick={props.onClose} className="popup__close" type="button" aria-label="закрытие"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;

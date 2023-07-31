import React from 'react';

function ImagePopup(props) {

  return (
    <div className={`popup popup_background_transparent popup_type_image-preview 
    ${props.card ? 'popup_is-opened' : ""}`}>
      <figure className="popup__card-container">
        <img className="popup__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <figcaption className="popup__title-card">
          {props.card ? props.card.name : ""}
        </figcaption>
        <button onClick={props.onClose} className="popup__close" type="button" aria-label="закрытие"></button>
      </figure>
    </div>
  );
}

export default ImagePopup;
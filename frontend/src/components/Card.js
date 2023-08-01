import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);

  /* const isOwn = card.owner._id === currentUser._id; */
  const isOwn = card.owner === currentUser._id;
  const cardTrashButtonClassName = (`element__trash ${!isOwn && "element__trash_hidden"}`);

  /* const isLiked = card.likes.some(i => i._id === currentUser._id); */
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`);

  function handleClick() {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleDeleteClick() {
    card.onCardDelete(card)
  }

  return (
    <li className="element">
      <button onClick={handleDeleteClick} className={cardTrashButtonClassName} type="reset"></button>
      <img className="element__image"
        onClick={handleClick}
        src={card.link}
        alt={card.name}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}
        </h2>
        <div className="element__like-group">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
          <p className="element__quantity-like">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
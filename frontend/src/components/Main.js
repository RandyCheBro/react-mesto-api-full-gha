import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img onClick={props.onEditAvatar} className="profile__avatar-image" src={currentUser.avatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="открыть-редактирование"></button>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="открыть-добавление"></button>
      </section>

      <section className="elements">
        <ul className="elements__table">
          {props.cards.map(card => (
            <Card
              {...card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
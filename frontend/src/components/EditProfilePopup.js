import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  return (
    <PopupWithForm
      name={'edit-profile'}
      isOpen={isOpen}
      onClose={onClose}
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-field">
        <input value={name ?? ''} onChange={handleChangeName} name="name" type="text" className="popup__input popup__input_text_name" placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="popup__input-error input-error-name"></span>
      </div>
      <div className="popup__input-field">
        <input value={description ?? ''} onChange={handleChangeDescription} name="about" type="text" className="popup__input popup__input_text_job" placeholder="Профессия"
          required minLength="2" maxLength="200" />
        <span className="popup__input-error input-error-about"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
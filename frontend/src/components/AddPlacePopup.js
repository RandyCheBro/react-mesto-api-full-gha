import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('')
  }, [isOpen])

  return (
    <PopupWithForm
      name={'add-card'}
      isOpen={isOpen}
      onClose={onClose}
      title={'Новое место'}
      buttonText={'Создать'}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-field">
        <input value={name ?? ''} onChange={handleChangeName} name="image-name" type="text" className="popup__input popup__input_text_image-name" placeholder="Название"
          required minLength="2" maxLength="30" />
        <span className="popup__input-error input-error-image-name"></span>
      </div>
      <div className="popup__input-field">
        <input value={link ?? ''} onChange={handleChangeLink} name="image-link" type="url" className="popup__input popup__input_text_image-link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error input-error-image-link"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
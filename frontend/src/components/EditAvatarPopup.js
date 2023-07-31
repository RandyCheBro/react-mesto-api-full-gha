import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name={'avatar'}
      isOpen={isOpen}
      onClose={onClose}
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-field">
        <input ref={avatarRef} name="avatar" type="url" className="popup__input popup__input_text_image-link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error input-error-avatar"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
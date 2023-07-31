import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose }) {

  return (
    <PopupWithForm
      name={'avatar'}
      isOpen={isOpen}
      onClose={onClose}
      title={'Вы уверены?'}
      buttonText={'Да'}
    >
    </PopupWithForm>
  );
}

export default ConfirmPopup;
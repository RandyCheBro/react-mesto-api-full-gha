import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils.js/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRouteElement from "./ProtectedRoute.js";
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import auth from '../utils.js/Auth.js';
import InfoTooltip from './InfoTooltip.js';


function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = useState([]);
  const isOpen = isAddPlacePopupOpen || isEditProfilePopupOpen || isEditAvatarPopupOpen || isConfirmPopupOpen || selectedCard || isTooltipPopupOpen;

  const [userEmail, setUserEmail] = React.useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false)

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmClick() {
    setIsConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setIsTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }


  useEffect(() => {

    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function closeAllPopupsByOverlay(evt) {
      if (evt.target.classList.contains("popup_is-opened")) {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      document.addEventListener('mousedown', closeAllPopupsByOverlay);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
        document.removeEventListener('mousedown', closeAllPopupsByOverlay);
      }
    }
  }, [isOpen])


  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData)
          setCards(cards)
        })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    /* const isLiked = card.likes.some(i => i._id === currentUser._id); */

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser({ name, about }) {
    api.changeData({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar({ avatar }) {
    api.changeAvatar({ avatar })
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then((newCards) => {
        setCards([newCards, ...cards])
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setUserEmail(null);
    setIsLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  function handleRegister(email, password) {
    if (!email || !password) {
      return;
    }
    auth.register(email, password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsTooltipPopupOpen(true);
      })
  }

  function handleLogin(email, password) {
    if (!email || !password) {
      return;
    }
    auth.login(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem("jwt", data.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true);
        setIsSuccess(false)
      })
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          navigate("/", { replace: true })
          setUserEmail(res.email)
        }
      })
        .catch((err) => {
          localStorage.removeItem("jwt")
          console.log(err)
        })
    }
  }, [navigate])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header onSignOut={handleSignOut} userEmail={userEmail} />
        <Routes>

          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onConfirm={handleConfirmClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />

          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />

          <Route path="*" element={<Navigate to="/" />} />


        </Routes>

        <Footer />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        <PopupWithForm />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

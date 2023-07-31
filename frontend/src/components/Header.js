import React from 'react';
import logo from '../images/logo.svg';
import { Route, Routes, Link } from 'react-router-dom';

function Header({ onSignOut, userEmail }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <Routes>

        <Route path='/sign-in'
          element={
            <Link className='header__link' to="/sign-up">
              Регистрация
            </Link>
          }
        />

        <Route path='/sign-up'
          element={
            <Link className='header__link' to="/sign-in">
              Войти
            </Link>
          }
        />

        <Route path='/'
          element={
            <div className='header__container'>
              <p className='header__email'>{userEmail}</p>
                <Link onClick={onSignOut} className='header__link' to="/sign-in">
                  Выйти
                </Link>
            </div>
          }
        />

      </Routes>
    </header>
  );
}

export default Header;
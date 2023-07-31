import React from "react";
import { Link } from 'react-router-dom'

function Register({ onRegister }) {
const [email, setEmail] = React.useState('')
const [password, setPassword] = React.useState('')

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password)
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value)
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value)
  }

  return (
    <div className='auth'>
      <h3 className='auth__title'>Регистрация</h3>
      <form onSubmit={handleSubmit} className='auth__form'>
        <input
          onChange={handleChangeEmail}
          value={email}
          className='auth__input'
          name='email'
          type='email'
          placeholder='Email'
          required
        />
        <input
          onChange={handleChangePassword}
          value={password}
          className='auth__input'
          name='password'
          type='password'
          placeholder='Пароль'
          required
        />
        <button type='submit' className='auth__button'>Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className='auth__link'>
        Уже зарегистрированы? Войти
      </Link>
    </div>
  )

}
export default Register
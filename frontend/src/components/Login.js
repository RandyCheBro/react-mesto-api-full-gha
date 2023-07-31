import React from "react";

function Login({ onLogin }) {
const [email, setEmail] = React.useState('')
const [password, setPassword] = React.useState('')

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password)
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value)
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value)
  }

  return (
    <div className='auth'>
      <h3 className='auth__title'>Вход</h3>
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
        <button type='submit' className='auth__button'>Войти</button>
      </form>
    </div>
  )

}
export default Login
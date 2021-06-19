import React from 'react';

import AuthForm from './AuthForm';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isEmptyEmail, setIsEmptyEmail] = React.useState(false);
  const [isEmptyPassword, setIsEmptyPassword] = React.useState(false);

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if(email === '') return setIsEmptyEmail(true);
    else setIsEmptyEmail(false);

    if(password === '') return setIsEmptyPassword(true);
    else setIsEmptyPassword(false);

    props.handleLogin({
      email: email,
      password: password
    });
  }

  return (
    <main className="auth">
      <AuthForm
        header="Вход"
        buttonText="Войти"
        onSubmit={handleSubmit}
        isLoading={props.isLoading}
      >
        <input
          className="auth__input auth__input_content_email"
          type="email"
          value={email || ''}
          onChange={handleEmailInput}
          placeholder="Email"
          autoComplete="off"
          required
        />
        <span
          className={`auth__input-error ${!isEmptyEmail ? '' : 'auth__input-error_visible'}`}
        >
          Заполните это поле
        </span>
        <input
          className="auth__input auth__input_content_password"
          type="password"
          value={password || ''}
          onChange={handlePasswordInput}
          placeholder="Пароль"
          autoComplete="off"
          required
        />
        <span
          className={`auth__input-error ${!isEmptyPassword ? '' : 'auth__input-error_visible'}`}
        >
          Заполните это поле
        </span>
      </AuthForm>
    </main>
  );
}

export default Login;
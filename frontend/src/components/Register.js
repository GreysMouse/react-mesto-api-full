import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from './AuthForm';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);

  const [emailValdationMessage, setEmailValdationMessage] = React.useState('');
  const [passwordValdationMessage, setPasswordValdationMessage] = React.useState('');

  const [isFormInvalid, setIsFormInvalid] = React.useState(true);

  React.useEffect(() => {
    !isValidEmail || !isValidPassword ? setIsFormInvalid(true) : setIsFormInvalid(false);
  }, [isValidEmail, isValidPassword]);

  function handleEmailInput(evt) {
    const {value, validity: {valid}, validationMessage} = evt.target;

    setEmail(value);

    setIsValidEmail(valid);
    setEmailValdationMessage(validationMessage);
  }

  function handlePasswordInput(evt) {
    const {value, validity: {valid}, validationMessage} = evt.target;

    setPassword(value);

    setIsValidPassword(valid);
    setPasswordValdationMessage(validationMessage);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    setEmail('');
    setPassword('');
    
    setIsValidEmail(false);
    setIsValidPassword(false);

    props.onRegister({
      email: email,
      password: password
    });
  }

  return (
    <main className="auth">
      <AuthForm
        header="Регистрация"
        buttonText="Зарегистрироваться"
        isFormInvalid={isFormInvalid}
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
          className={`auth__input-error ${isValidEmail ? '' : 'auth__input-error_visible'}`}
        >
          {emailValdationMessage}
        </span>
        <input
          className="auth__input auth__input_content_password"
          type="password"
          value={password || ''}
          onChange={handlePasswordInput}
          placeholder="Пароль"
          minLength="6"
          autoComplete="off"
          required
        />
        <span
          className={`auth__input-error ${isValidPassword ? '' : 'auth__input-error_visible'}`}
        >
          {passwordValdationMessage}
        </span>
      </AuthForm>
      <Link className="auth__redirect-link" to="/sign-in">Уже зарегистрированы? Войти</Link>
    </main>
  );
}

export default Register;
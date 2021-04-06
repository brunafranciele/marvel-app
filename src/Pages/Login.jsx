import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
// import Context from '../Context/Context';
// import '../Login.css';
export default function Login({ history }) {
  // const { email, setEmail, password, setPassword,
  //   handleClick, valid, setValid } = useContext(Context);
  // useEffect(() => {
  //   setValid(false);
  //   // eslint-disable-next-line
  // }, []);
  // useEffect(() => {
  //   const seven = /.{6,}/;
  //   const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  //   setValid(reg.test(email) && seven.test(password));
  //   // eslint-disable-next-line
  // }, [email, password]);
  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="login-title">Marvel</h1>
        <div className="login-image" />
      </div>
      <form className="login-form">
        <div className="login-inputs">
          <label className="login-label" htmlFor="email-input">
            Email
            <input
              type="email"
              data-testid="email-input"
              id="email-input"
              // onChange={ ({ target }) => setEmail(target.value) }
              className="login-email"
            />
          </label>
          <label className="login-label" htmlFor="password-input">
            Senha
            <input
              type="password"
              data-testid="password-input"
              id="password-input"
              // onChange={ ({ target }) => setPassword(target.value) }
              className="login-pass"
            />
          </label>
        </div>
        <div className="login-button-container">
          <button
            // disabled={ !valid }
            type="button"
            data-testid="signin-btn"
            // onClick={ () => handleClick(history) }
            className="login-button"
          >
            Entrar
          </button>
          <Link
            to="/register"
            data-testid="no-account-btn"
            className="login-input-btn"
          >
            Ainda não tenho conta
          </Link>
        </div>
      </form>
    </div>
  );
}
Login.defaultProps = {
  history: '/login',
};
Login.propTypes = {
  history: propTypes.shape(),
};
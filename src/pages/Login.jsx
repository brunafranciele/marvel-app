import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Gif from '../components/Gif';
import { validateEmail, validatePassword } from '../utils/validations';
import { loginUser } from '../service/nativeAPIRequest';
import { setUserLogin } from '../utils/localstorage';
import logoMarvel from '../images/logoM.jpg';
import '../styles/login.css';

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [mudei, setMudei] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const timeGif = () => {
    setMudei(true)
  }

  const setUserOnAPI = async () => {
    const requestAPI = await loginUser(email, password);
    return requestAPI;
  };

  const handleClick = async () => {
    const resp = await setUserOnAPI();
    console.log(resp, 'resposta api login')
    if (resp && !resp.message) {
      const { token, name, email, id, password } = await resp;
      setUserLogin(token, name, email, id, password)
      timeGif()

    }
    if (resp && resp.message) setMessage(resp.message);
  }

  const setField = (field, value) => {
    if (field === 'Email') return setEmail(value);
    return setPassword(value);
  };

  return (
    <div>
      {mudei ? <Gif /> : 
    <div>
      <section
        className='login-container'
      >
        <form
          className='loginForm'
        >
          <img className='logo-marvel-login' src={logoMarvel} alt='logo marvel' />
          <section className="loginInputs">
            <Input
              title="Email"
              type="text"
              value={email}
              onChange={setField}
              placeholder="User email"
            />
            <Input
              title="Password"
              type="password"
              value={password}
              onChange={setField}
              placeholder="User password"
            />
          </section>
                  {message ? <span>{message}</span> : null}
          <section className="loginButtons">
            <Button
              title="Log in"
              isDisabled={isDisabled}
              onClick={() => handleClick()}
            />
            <h3>Don't have an account?</h3>
            <Button
              title="Sign up"
              onClick={() => history.push('/register')}
            />
          </section>
        </form>
      </section>
    </div>
    }
    </div>
  );
}
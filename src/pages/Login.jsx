import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validatePassword } from '../utils/validations';
import { loginUser } from '../service/nativeAPIRequest';
import { setUserLogin } from '../utils/localstorage';

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const setUserOnAPI = async () => {
    const requestAPI = await loginUser(email, password);
    return requestAPI;
  };

  const handleClick = async () => {
    const resp =  await setUserOnAPI();
    console.log(resp, 'resposta api login')
    if (resp && !resp.message) {
      const { token, name, email, id } = await resp;
      setUserLogin(token, name, email, id)
      history.push('/characters')
    }
    if(resp && resp.message) setMessage(resp.message);
  }

  const setField = (field, value) => {
    if (field === 'Email') return setEmail(value);
    return setPassword(value);
  };

  return (
    <section className="defaultPage">
      <form className="loginForm">
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
        <section className="loginButtons">
          <Button
            title="Log in"
            isDisabled={isDisabled}
            onClick={() => handleClick() }
          />
          <Button
            title="Sign up"
            onClick={() => history.push('/register')}
          />
        </section>
      </form>
      {message ? <span>{message}</span> : null}
    </section>
  );
}
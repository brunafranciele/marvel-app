import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validatePassword } from '../utils/validations';
import { updateUser, verifyUser } from '../utils/localstorage';
import { updateUserAPI } from '../service/nativeAPIRequest';
import Menu from '../components/Menu';
import '../styles/profile.css';
import logoMarvel from '../images/logoM.jpg';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const history = useHistory();

  const setField = (field, value) => {
    if (field === 'Name') return setName(value);
    if (field === 'Email') return setEmail(value);
    return setPassword(value);
  };

  useEffect(() => {
    const { name, email, password, id, token } = verifyUser(history);
    setName(name);
    setEmail(email);
    setPassword(password);
    setId(id);
    setToken(token);
  }, [history]);

  useEffect(() => {
    if (validateEmail(email)) {
      updateUser(name, email, password)
    }
  }, [email, name, password]);

  const updateUserOnDB = async () => {
    console.log(name, email, password, id, token, 'body do front')
    const requestAPI = await updateUserAPI(name, email, password, id, token);
    console.log(requestAPI, 'pagina profile resposta');
    return requestAPI;
  };

  const timeGif = () => {
    setTimeout(function () {
      setMessage('');
    }, 1000)
  }

  const handleClick = async () => {
    await updateUserOnDB(name, email, password, id, token);
    updateUser(name, email, password)
    setMessage('Atualização concluída com sucesso');
    timeGif()
  }

  return (
    <div className="profile-container">
      <header>
        <Menu />
      </header>
      <img className='logo-marvel-profile' src={logoMarvel} alt='logo marvel' />
      <div className='content-profile'>
      <form className="div-form">
        <div className="register-inputs">
          <Input
            title="Name"
            type="text"
            value={name}
            onChange={setField}
          />
          <Input
            title="Email"
            type="text"
            value={email}
            onChange={setField}
          />
          <Input
            title="Password"
            type="password"
            value={password}
            onChange={setField}
          />
        </div>
      </form>
      {/* <section className="button profile-button"> */}
        <Button
          title="Save"
          onClick={handleClick}
          className="button profile-button"
        />
      {/* </section> */}
      </div>
      {message ? <span className='att'>{message}</span> : null}
    </div>
  );
}

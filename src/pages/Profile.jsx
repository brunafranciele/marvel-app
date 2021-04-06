import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validatePassword } from '../utils/validations';
import { updateUser, verifyUser } from '../utils/localstorage';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const setField = (field, value) => {
    if (field === 'Name') return setName(value);
    if (field === 'Email') return setEmail(value);
    return setPassword(value);
  };

  useEffect(() => {
    const { name, email, password } = verifyUser(history);
    setName(name);
    setEmail(email);
    setPassword(password);
  }, [history]);

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsDisabled(false);
    }
  }, [email, password]);

  function handleClick() {
    updateUser(name, email, password);
    setMessage('Atualização concluída com sucesso');
  }

  return (
    <div className="profile-main-div">
      <form className="d-flex flex-column mt-4">
        <div className="register-inputs">
        <Input
          title="Name"
          type="text"
          value={ name }
          onChange={ setField }
        />
        <Input
          title="Email"
          type="text"
          value={ email }
          onChange={ setField }
        />
        <Input
          title="Password"
          type="password"
          value={ password }
          onChange={ setField }
        />
        </div>
      </form>
      <section className="register-section-btns">
        <Button
          title="Save"
          isDisabled={ isDisabled }
          onClick={ handleClick }
        />
      </section>
      {message ? <span>{message}</span> : null}
    </div>
  );
}

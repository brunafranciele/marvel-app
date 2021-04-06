import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validatePassword } from '../utils/validations';
import { registerLS } from '../utils/localstorage';

export default function Register() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsDisabled(false);
      registerLS(name, email, password);
    }
  }, [email, password, name]);

  const setField = (field, value) => {
    if (field === 'Email') return setEmail(value);
    if (field === 'Name') return setName(value);
    return setPassword(value);
  };

  return (
    <form className="inputs register-form">
      <Input
        title="Name"
        type="text"
        value={name}
        onChange={setField}
        placeholder="User name"
      />
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
      <Button
        title="Register"
        isDisabled={isDisabled}
        onClick={() => history.push('/main')}
      />
    </form>
  );
}
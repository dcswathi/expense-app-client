import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../actions/userAction';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    setEmailErr('');
    setPassword('');

    if (!email) {
      setEmailErr('Email field can not be empty');
    } else if (!email.match(validRegex)) {
      setEmailErr('Invalid email format');
    }

    if (!password) {
      setPasswordErr('Password field can not be empty');
    }

    if (email !== '' && password !== '') {
      const formData = {
        email,
        password,
      };

      dispatch(saveUser(formData))
        .then(() => {
          alert('Logged in successfully');
          props.history.push('/home');
          props.handleAuth();
        })
        .catch((error) => {
          alert(`Failed to login , reason: ${error}`);
        });
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;

    if (e.target.name === 'email') {
      setEmail(input);
    } else if (e.target.name === 'password') {
      setPassword(input);
    }
  };

  return (
    <div>
      <h2> Login </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        {emailErr && (
        <small style={{ color: 'red' }}>
          {' '}
          {emailErr}
          {' '}
        </small>
        )}
        <br />

        <input
          type="text"
          placeholder="enter password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        {passwordErr && (
        <small style={{ color: 'red' }}>
          {' '}
          {passwordErr}
          {' '}
        </small>
        )}
        <br />

        <input
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Login;

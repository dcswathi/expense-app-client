import React, { useState } from 'react';
import axios from 'axios';

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    setEmailErr('');
    setPassword('');

    if (!username) {
      setUsernameErr('Username can not be empty');
    }

    if (!email) {
      setEmailErr('Email field can not be empty');
    } else if (!email.match(validRegex)) {
      setEmailErr('Invalid email format');
    }

    if (!password) {
      setPasswordErr('Password field can not be empty');
    }

    if (username !== '' && email !== '' && password !== '') {
      const formData = {
        username,
        email,
        password,
      };

      axios.post('http://localhost:3050/api/users/register', formData)
        .then((response) => {
          const result = response.data;

          if (result.hasOwnProperty('errors')) {
            alert(`Failed to created account , reason : ${result.message}`);
          } else {
            alert('Account is created successfully');
            props.history.push('/login');
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;

    if (e.target.name === 'username') {
      setUsername(input);
    } else if (e.target.name === 'email') {
      setEmail(input);
    } else if (e.target.name === 'password') {
      setPassword(input);
    }
  };

  return (
    <div>
      <h2> Register with us</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter username"
          value={username}
          name="username"
          onChange={handleChange}
        />
        {usernameErr && (
        <small style={{ color: 'red' }}>
          {' '}
          {usernameErr}
          {' '}
        </small>
        )}
        <br />

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
        {' '}
        <br />

        <input
          type="submit"
          value="Register"
        />
      </form>
    </div>
  );
};

export default Register;

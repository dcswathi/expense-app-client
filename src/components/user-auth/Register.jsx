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
    <div className='register-container'>
      <div className='register-inner-container'>
        <h2> Register with us</h2>
        <form className='register-form' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            name="username"
            onChange={handleChange}
            size={30}
          />
          <br />
          <div className='min-height-40'>
            {usernameErr && (
            <small style={{ color: 'red' }}>
              {' '}
              {usernameErr}
              {' '}
            </small>
            )}
          </div>

          <input
            type="text"
            placeholder="Enter email"
            value={email}
            name="email"
            onChange={handleChange}
            size={30}
          />
          <br />
          <div className='min-height-40'>
            {emailErr && (
            <small style={{ color: 'red' }}>
              {' '}
              {emailErr}
              {' '}
            </small>
            )}
          </div>

          <input
            type="text"
            placeholder="Enter password"
            value={password}
            name="password"
            onChange={handleChange}
            size={30}
          />
          <br />
          <div className='min-height-40'>
            {passwordErr && (
            <small style={{ color: 'red' }}>
              {' '}
              {passwordErr}
              {' '}
            </small>
            )}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

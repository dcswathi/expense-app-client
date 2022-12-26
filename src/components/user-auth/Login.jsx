import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/userAction';

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

      dispatch(loginUser(formData))
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
    <div className='login-container'>
      <div className='login-inner-container'>
        <h2> Login </h2>
        <form  className='login-form' onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

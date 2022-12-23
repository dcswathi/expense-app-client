import React from 'react';
import { withRouter } from 'react-router-dom'

const Header = ({ userLoggedIn, handleAuth, history }) => {
  return (
    <div className='header'>
      <h1>Expenseeve</h1>
      {
        userLoggedIn && <button onClick={() => {
          localStorage.removeItem('token')
          alert('Logged out successfully')
          handleAuth()
          history.push('/')
        }}> Logout </button>
      }

    </div>
  );
};

export default withRouter(Header);
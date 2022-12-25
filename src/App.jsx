import React, { useEffect, useState } from 'react';
import NavBar from './components/user-auth/NavBar';
import Header from './components/Header';
import Main from './components/Main';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleAuth();
    }
  }, []);

  return (
    <div className="wrapper">
      <Header userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
      <div className="app">
        <NavBar userLoggedIn={userLoggedIn} />
        <Main handleAuth={handleAuth} userLoggedIn={userLoggedIn} />
      </div>
    </div>
  );
};

export default App;

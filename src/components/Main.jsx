import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

import Welcome from './Welcome';
import Home from './Home';
import Settings from './Settings';
import Profile from './Profile';

import Register from './user-auth/Register';
import Login from './user-auth/Login';

const Main = ({ handleAuth, userLoggedIn }) => (
  <div className="main">
    <Route path="/" render={() => (userLoggedIn ? <Redirect to="/home" /> : <Welcome />)} exact />
    <Route path="/home" component={Home} />
    <Route path="/settings" component={Settings} />
    <Route path="/profile" component={Profile} />

    <Route path="/register" component={Register} />
    <Route
      path="/login"
      render={(props) => (
        <Login
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          handleAuth={handleAuth}
        />
      )}
    />
  </div>
);

export default withRouter(Main);

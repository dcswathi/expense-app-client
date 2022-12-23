import React from 'react';
import {Route, withRouter} from 'react-router-dom'

import Welcome from './Welcome'
import Home from './Home'
import Settings from './Settings'
import Profile from './Profile'

import Register from './user-auth/Register'
import Login from './user-auth/Login'

const Main = ({ handleAuth }) => {
  return (
    <div className='main'>
      <Route path='/' component={Welcome} exact />
      <Route path='/home' component={Home} />
      <Route path='/settings' component={Settings} />
      <Route path='/profile' component={Profile} />

      <Route path="/register" component={Register} />
      <Route
          path="/login"
          render={(props) => {
              return (
                  <Login
                      {...props}
                      handleAuth={handleAuth}
                  />
              )
          }}
      />
    </div>
  );
};

export default withRouter(Main);
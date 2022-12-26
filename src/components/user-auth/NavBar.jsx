import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isSelected = (pathname, linkTo) => pathname === linkTo;

const NavBar = (props) => {
  console.log("NavBar", props);
  const { userLoggedIn, location : { pathname } } = props;

  const getClassName = (linkTo) => isSelected(pathname, linkTo) ? {className: "nav-bar-link-selected"} : {className: "nav-bar-link"};

  return (
    <ul className="nav-bar">
      {
        userLoggedIn ? (
          <>
            <Link className="nav-bar-link" to="/home"><li {...getClassName("/home")}>Home</li></Link>
            <Link className="nav-bar-link" to="/settings"><li {...getClassName("/settings")}>Settings</li></Link>
            <Link className="nav-bar-link" to="/profile"><li {...getClassName("/profile")}>Profile</li></Link>
          </>
        ) : (
          <>
            <Link className="nav-bar-link" to="/register"><li {...getClassName("/register")}>Register</li></Link>
            <Link className="nav-bar-link" to="/login"><li {...getClassName("/login")}>Login</li></Link>
          </>
        )
      }
    </ul>
  );
};

// const WrappedComponent = withRouter(NavBar)
// export default WrappedComponent
export default withRouter(NavBar);

import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const NavBar = (props) => {
    const { userLoggedIn } = props

    return (
        <ul className='nav-bar'>
                    {
                        userLoggedIn ? (
                            <>
                                <Link className='nav-bar-link' to = '/home' > <li>Home</li></Link >
                                <Link className='nav-bar-link' to='/settings'><li> Settings</li></Link>
                                <Link className='nav-bar-link' to='/profile'><li> Profile</li></Link>
                            </>
                        ) : (
                            <>
                                <Link className='nav-bar-link' to="/register"><li>  Register</li></Link>
                                <Link className='nav-bar-link' to="/login"><li>  Login</li></Link>
                            </>
                        )
                    }
            </ul>
    )
}

// const WrappedComponent = withRouter(NavBar)
// export default WrappedComponent
export default withRouter(NavBar)
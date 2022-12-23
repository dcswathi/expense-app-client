import React from 'react'
import { useSelector } from 'react-redux'

const Profile = (props) => {
    const user = useSelector((state) => state.user);

    return (
        <div>
          Profile
          <ul>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
          </ul>
        </div>
    )
}

export default Profile
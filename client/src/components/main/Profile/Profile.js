import React, { useContext } from 'react'
import './profile.css'
import UserContext from '../../../context/UserContext'
import { Link, withRouter } from 'react-router-dom'

const Profile = () => {

    const { userData } = useContext(UserContext)


    return (
        <div className='profile'>
            <img src={
                    userData.user ?
                        `http://localhost:40/images/${userData.user.user_image.split("\\")[1]}` : null
                } alt="" />
            <p style={{marginTop:"20px"}}><strong>First Name : </strong>{userData.user ? userData.user.fname : null}</p>
            <p><strong>Last Name : </strong>{userData.user ? userData.user.lname : null}</p>
            <p><strong>Username : </strong>{userData.user ? userData.user.username : null}</p>
            <p><strong>Email : </strong>{userData.user ? userData.user.email : null}</p>
            <p><strong>Height (ft) : </strong>{userData.user ? userData.user.height : null}</p>
            <p><strong>Weight (kg): </strong>{userData.user ? userData.user.weight : null}</p>

            <Link to='/edit-profile'><button>Edit Profile</button></Link>
        </div>
    )
}

export default withRouter(Profile)

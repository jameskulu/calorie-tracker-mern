import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../images/logo.png'
import './Header.css'
import UserContext from '../../context/UserContext'
import { toast } from 'react-toastify'


const Header = () => {

  const history = useHistory()
  const { userData, setUserData } = useContext(UserContext) //stores logged in data
  const logout = () => {
    setUserData({
      token: undefined, user: undefined //empty user,token data after logout
    })
    localStorage.setItem('auth-token', '') //empty local storage
    history.push('/login') //redirects to login after logout
    toast.success("You have logged out successfully.")
  }

  return (
    <div>
      {/* logo */}
      <nav className="navbar navbar-expand-lg navbar-light " style={{ padding: "0 100px" }}>
        <div className="collapse navbar-collapse" id="navbarSupportedContent2">
          <div className="logo">
            <Link to='/'><img src={Logo} alt="Calorie Tracker" /></Link>
          </div>
        </div>
      </nav>


      {/* nav bar */}
      <nav class="navbar navbar-expand-lg navbar-dark bg-success" style={{ padding: "0 100px" }}>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">Category</Link> </li>
            <li className="nav-item">
              <Link className="nav-link" to="/foods">Food</Link></li>
            <li className="nav-item">
              <Link className="nav-link" to="/diary">Diary</Link></li>


              {/*shown only if user is admin */}
            {
              userData.user ?
                userData.user.role === 'Admin' ?
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link></li>
                  :
                  null
                :
                null
            }

            {/* dropdown menu */}

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                My Profile</a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item" to="/profile">Manage Profile</Link>
                <Link className="dropdown-item" onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {logout()}}}>Logout</Link>
              </div>
            </li>
          </ul>

        </div>
      </nav>
    </div>
  )
}

export default Header

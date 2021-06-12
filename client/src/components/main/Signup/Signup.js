import React, { useContext, useState } from 'react'
import Food from '../../../images/green.jpg'
import './Signup.css'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../../../context/UserContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function Signup() {

  const history = useHistory()

  const { setUserData } = useContext(UserContext)

  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [password2, setPassword2] = useState()

  const register = async (e) => {
    e.preventDefault()

    if (password !== password2) {
      return toast.error('Two password fields did not match.')
    }

    try {
      const newUser = { fname, lname, username, email, password }
      await axios.post("http://localhost:40/user/register", newUser)
      // const loginResponse = await axios.post('http://localhost:40/user/login', { username, password })
      // setUserData({
      //   token: loginResponse.data.token,
      //   user: loginResponse.data.user
      // })

      // localStorage.setItem('auth-token', loginResponse.data.token)
      history.push("/login")
      toast.success("Your account is created successfully.")
    }
    catch (err) {
      toast.error(err.response.data.msg)
    }
  }

  return (

    <div className="login col-md-12">

      <div className="signup1 col-md-6">
        <img src={Food} alt="Signup" />
      </div>

      <div className="loginmain col-md-6">

        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title">Signup</h5>
            <form className="form-login" onSubmit={register}>
              <div className="form-group">
                <label htmlFor="inpuTFirstname">First Name</label>
                <input type="name" id="inpuTFirstname" className="form-control" value={fname}
                  onChange={e => setFname(e.target.value)}
                  placeholder="First Name" required autofocus />
              </div>
              <div className="form-group">
                <label htmlFor="inpuTLastname">Last Name</label>
                <input type="username" id="inpuTLastname" className="form-control"
                  value={lname}
                  onChange={e => setLname(e.target.value)}
                  placeholder="Last Name" required autofocus />
              </div>
              <div className="form-group">
                <label htmlFor="inputUsername">Username</label>
                <input type="username" id="inputUsername" className="form-control"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Username" required autofocus />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  aria-describedby="emailHelp" placeholder="Enter email" />
              </div>

              <div className="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="Password" required />

              </div>
              <div className="form-group">
                <label for="inputPassword">Confirm Password</label>
                <input type="password" id="inputPassword" className="form-control"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)} placeholder="Password" required />

              </div>
              <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Signup</button>

              <p>Don't have an account?
              <Link to="/login">
                  <button className="btn btn-link">Login</button>
                </Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

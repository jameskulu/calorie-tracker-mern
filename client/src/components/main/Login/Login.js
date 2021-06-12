import React, { useContext, useState } from 'react'
import Food from '../../../images/oats.jpg'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../../../context/UserContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function Login(){

    const history = useHistory()

    const { setUserData } = useContext(UserContext)
  
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
  
  
    const submit = async (e) => {
      e.preventDefault()
  
      try {
        const loginResponse = await axios.post('http://localhost:40/user/login', { username, password })
        console.log(loginResponse)
        setUserData({
          token: loginResponse.data.token,
          user: loginResponse.data.user
        })
        localStorage.setItem('auth-token', loginResponse.data.token)
        toast.success('You are logged in successfully.')
        history.push("/")
      }
      catch (err) {
        toast.error(`${err.response.data.msg }`)
      }
    }
  
        return (
            <div className="login col-md-12">

                <div className="login1 col-md-6">
                    <img src={Food} alt="Login" />

                </div>
                <div className="loginmain col-md-6">

                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Log in</h5>
                            <form className="form-login" onSubmit={submit}>
                                <div className="form-label-group">
                                    <label htmlFor="inputUsername">Username</label>
                                    <input type="username" id="inputUsername" className="form-control"
                                        placeholder="Username" required autoFocus value={username} onChange={e => setUsername(e.target.value)} />
                                </div>
                                <div className="form-label-group">
                                    <label htmlFor="inputPassword">Password</label>
                                    <input type="password" id="inputPassword"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Password" required />

                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" for="customCheck1"><p>Remember password</p></label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>
                                <p>Don't have an account?<Link to="/signup">
                                        <button className="btn btn-link">Sign up</button></Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Login

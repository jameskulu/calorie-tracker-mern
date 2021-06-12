import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import Admin from '../Admin'

const AddUser = () => {

    const history = useHistory()

    const [fname, setFname] = useState()
    const [lname, setLname] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState()


    const onUserAdd = async (e) => {
        e.preventDefault()

        try {

            const newUser = {
                fname, lname, username, email, password, role
            }

            const token = localStorage.getItem("auth-token")
            await axios.post("http://localhost:40/user/register", newUser
                // { headers: { 'Authorization': 'Bearer ' + token } }
            )

            toast.success("New user has been added.")
            setFname("")
            setLname("")
            setUsername("")
            setEmail("")
            setPassword("")

            history.push('/admin/user')
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    return (
        <Admin>
            <div style={{ padding: "20px 40px" }}>
                <h3>Add User</h3>
                <form action="" onSubmit={onUserAdd}>
                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">First Name</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            required
                            autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Last Name</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                            value={lname}
                            required
                            onChange={(e) => setLname(e.target.value)}
                            autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Username</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Email</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Password</label>
                        <input type="password" id="inpuTFirstname" className="form-control"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus />
                    </div>

                    <div>
                        <p>Role</p>
                    </div>

                    <div>
                        <label htmlFor="user">User</label>
                        <input type="radio" id='user' name="Role" value="User" onClick={(e) => setRole(e.target.value)} />
                    </div>
                    <hr />
                    <div>
                        <label htmlFor="admin">Admin</label>
                        <input type="radio" id='admin' name="Role" value="Admin" onClick={(e) => setRole(e.target.value)} />
                    </div>



                    <button className="btn btn-lg btn-success btn-block text-uppercase">Add</button>

                </form>
            </div>
        </Admin>
    )
}

export default AddUser

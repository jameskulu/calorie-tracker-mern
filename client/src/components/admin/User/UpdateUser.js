import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import Admin from '../Admin'
import {withRouter} from 'react-router-dom'

const UpdateUser = (props) => {

    const history = useHistory()

    const userId = props.match.params.userId

    const [fname, setFname] = useState()
    const [lname, setLname] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [weight, setWeight] = useState()
    const [image, setImage] = useState()
    const [role, setRole] = useState()
    const [height, setHeight] = useState()


    useEffect(() => {

        const loadSingleUser = async () => {
            const token = localStorage.getItem('auth-token')
            const singleUserRes = await axios.get(`http://localhost:40/user/${userId}`,
                { headers: { 'Authorization': 'Bearer ' + token } })

            setFname(singleUserRes.data.data.fname)
            setLname(singleUserRes.data.data.lname)
            setUsername(singleUserRes.data.data.username)
            setEmail(singleUserRes.data.data.email)
            setWeight(singleUserRes.data.data.weight)
            setHeight(singleUserRes.data.data.height)
            setImage(singleUserRes.data.data.user_image)
            setRole(singleUserRes.data.data.role)

        }
        loadSingleUser()

    }, [])

    const onUserUpdate = async (e) => {
        e.preventDefault()

        try {
            

            const updateUser = new FormData() // new line
            updateUser.append('fname', fname)
            updateUser.append('lname', lname)
            updateUser.append('username', username)
            updateUser.append('email', email)
            updateUser.append('height', height)
            updateUser.append('weight', weight)
            updateUser.append('role', role)
            updateUser.append('user_image', image)


            // const updateUser = {
            //     height, weight
            // }

            const token = localStorage.getItem("auth-token")
            await axios.put("http://localhost:40/user/update/" + userId, updateUser,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("User has been updated.")

            history.push('/admin/user')
        }
        catch (err) {
            // toast.error(err.response.data.msg)
            console.log(err.response)
        }
    }


    return (
        <Admin>
            <div style={{ padding: "20px 40px" }}>
                <h3>Update User</h3>
                <form action="" onSubmit={onUserUpdate}>
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
                        <label htmlFor="inpuTFirstname">Height(ft)</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                            value={height}
                            required
                            onChange={(e) => setHeight(e.target.value)}
                            autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Weight(kg)</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                            value={weight}
                            required
                            onChange={(e) => setWeight(e.target.value)}
                            autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Image</label>
                        <input type="file"
                            name='image'
                            className="form-control" 
                            onChange={(e) => setImage(e.target.files[0])}
                            autoFocus />
                    </div>

                    <div>
                        <p>Role</p>
                    </div>

                    <div>
                        <label htmlFor="user">User</label>
                        <input type="radio" id='user'
                         checked={role === 'User' ? true : false} name="Role" value="User" onClick={(e) => setRole(e.target.value)} />
                    </div>
                    <hr />
                    <div>
                        <label htmlFor="admin">Admin</label>
                        <input type="radio" id='admin' name="Role"
                         checked={role === 'Admin' ? true : false}
                         value="Admin" onClick={(e) => setRole(e.target.value)} />
                    </div>



                    <button className="btn btn-lg btn-success btn-block text-uppercase">Update</button>

                </form>
            </div>
        </Admin>
    )
}

export default withRouter(UpdateUser)

import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import UserContext from '../../../context/UserContext'
import {withRouter} from 'react-router-dom'


const EditProfile = () => {

    const history = useHistory()
    const { userData, setUserData } = useContext(UserContext)

    const [image, setImage] = useState(userData.user ? userData.user.user_image : "")
    const [weight, setWeight] = useState(userData.user ? userData.user.weight : "")
    const [height, setHeight] = useState(userData.user ? userData.user.height : "")

    const onEditProfile = async (e) => {

        e.preventDefault()

        try {

            const updateUser = new FormData() // new line
            updateUser.append('user_image', image)
            updateUser.append('weight', weight)
            updateUser.append('height', height)
        
            const token = localStorage.getItem("auth-token")
            const userResponse = await axios.put("http://localhost:40/user/update/" + userData.user._id, updateUser,
                { headers: { 'Authorization': 'Bearer ' + token } })
            setUserData({
                token: localStorage.getItem('auth-token'),
                user: userResponse.data.data
            })
            history.push('/profile')
            toast.success("Profile updated successfully")

        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    return (
        <div className='edit-profile'>
            <h1>Edit Profile</h1>
            <form action="" onSubmit={onEditProfile}>

            <div className="form-group">
                    <label htmlFor="inpuTFirstname">Image</label>
                    <input type="file"
                        className="form-control"
                        onChange={(e)=>setImage(e.target.files[0])}
                        // required
                        autoFocus />
                </div>

                

                <div className="form-group">
                    <label htmlFor="inpuTFirstname">Height(ft)</label>
                    <input type="text" id="inpuTFirstname" className="form-control" value={height}
                        onChange={e => setHeight(e.target.value)}
                        required
                        autoFocus />
                </div>
                <div className="form-group">
                    <label htmlFor="inpuTFirstname">Weight(kg)</label>
                    <input type="text" id="inpuTFirstname" className="form-control" value={weight}
                        onChange={e => setWeight(e.target.value)}
                        required
                        autoFocus />
                </div>

                <button className="btn btn-lg btn-primary btn-block text-uppercase">Update</button>

            </form>
        </div>
    )
}

export default withRouter(EditProfile)

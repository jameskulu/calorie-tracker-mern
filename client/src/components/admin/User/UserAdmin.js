import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Admin from '../Admin'

const UserAdmin = () => {

    const [users, setUsers] = useState([])
    const [deleted, setDeleted] = useState([])

    useEffect(() => {

        const loadUsers = async () => {
            const token = localStorage.getItem('auth-token')
            const usersRes = await axios.get('http://localhost:40/user/retrieve',
            { headers: { 'Authorization': 'Bearer ' + token } })
            const sortedUsersRes = usersRes.data.data.reverse()
            setUsers(sortedUsersRes)
        }

        loadUsers()

    }, [deleted])

    const onUserDelete = async (id) => {
        try {
            const token = localStorage.getItem("auth-token")
            await axios.delete("http://localhost:40/user/delete/" + id,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("User is deleted.")
            setDeleted(prevValue => !prevValue)
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    return (
        <Admin>
            <div class="card mb-3">
                <div class="card-header">
                    <i class="fas fa-table"></i>Users Table</div>
                <div class="card-body">
                    <Link to='/admin/user/add'><button className="btn btn-success mb-4">Add User</button></Link>
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Height (ft)</th>
                                    <th>Weight (kg)</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                           
                            <tbody>
                                {
                                    users.map(user=>{
                                        return(
                                            <tr>
                                                <td>{user.fname}</td>
                                                <td>{user.lname}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>{user.height}</td>
                                                <td>{user.weight}</td>
                                                <td ><img width="100" src={`http://localhost:40/images/${user.user_image.split("\\")[1]}`} alt="" /></td>
                                                <td>
                                                    <Link to={`/admin/user/update/${user._id}`} className='text-primary'>Update </Link>
                                                    <Link className='text-danger'
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure want to delete this food ?')) {
                                                                onUserDelete(user._id)
                                                            }
                                                        }}
                                                    > Delete</Link>
                                                </td>
                                            </tr> 
                                        )
                                    })
                                }    
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Admin>
    )
}

export default UserAdmin

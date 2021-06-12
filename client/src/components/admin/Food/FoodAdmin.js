import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Admin from '../Admin'

const FoodAdmin = () => {

    const [food, setFood] = useState([])
    const [deleted, setDeleted] = useState([])

    useEffect(() => {

        const loadFood = async () => {
            const token = localStorage.getItem('auth-token')
            const foodRes = await axios.get('http://localhost:40/food/retrieve',
            { headers: { 'Authorization': 'Bearer ' + token } })
            const sortedFoodRes = foodRes.data.data.reverse()
            setFood(sortedFoodRes)
        }

        loadFood()

    }, [deleted])


    const onFoodDelete = async (id) => {
        try {
            const token = localStorage.getItem("auth-token")
            await axios.delete("http://localhost:40/food/delete/" + id,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Food is deleted.")
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
                    <i class="fas fa-table"></i>Food Table</div>
                <div class="card-body">
                <Link to="/admin/food/add"><button className="btn btn-success mb-4">Add Food</button></Link>
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Food Name</th>
                                    <th>Calories</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                {
                                    food.map(f=>{
                                        return(
                                            <tr>
                                                <td>{f.food_name}</td>
                                                <td>{f.food_calories}</td>
                                                <td>{f.food_description}</td>
                                                <td>{f.category}</td>
                                                <td ><img width="100" src={`http://localhost:40/images/${f.food_image.split("\\")[1]}`} alt="" /></td>
                                                <td>
                                                    <Link to={`/admin/food/update/${f._id}`} className='text-primary'>Update </Link>
                                                    <Link className='text-danger'
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure want to delete this food ?')) {
                                                                onFoodDelete(f._id)
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

export default FoodAdmin

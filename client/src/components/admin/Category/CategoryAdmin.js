import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Admin from '../Admin'

const Category = () => {


    const [categories, setCategories] = useState([])
    const [deleted, setDeleted] = useState([])

    useEffect(() => {

        const loadCategories = async () => {
            const token = localStorage.getItem('auth-token')
            const categoriesRes = await axios.get('http://localhost:40/category/retrieve',
                { headers: { 'Authorization': 'Bearer ' + token } })
            const sortedCategoriesRes = categoriesRes.data.data.reverse()
            setCategories(sortedCategoriesRes)
        }

        loadCategories()

    }, [deleted])



    const onCategoryDelete = async (id) => {
        try {
            const token = localStorage.getItem("auth-token")
            await axios.delete("http://localhost:40/category/delete/" + id,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Category is deleted.")
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
                    <i class="fas fa-table"></i>Category Table</div>
                <div class="card-body">
                    <Link to="/admin/category/add"><button className="btn btn-success mb-4">Add Category</button></Link>
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.map(category => {
                                        return (
                                            <tr>
                                                <td>{category.category_name}</td>
                                                <td ><img width="100" src={`http://localhost:40/images/${category.category_image.split("\\")[1]}`} alt="" /></td>
                                                <td>
                                                    <Link to={`/admin/category/update/${category._id}`} className='text-primary'>Update </Link>
                                                    <br/>
                                                    <Link className='text-danger'
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure want to delete this category ?')) {
                                                                onCategoryDelete(category._id)
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

export default Category

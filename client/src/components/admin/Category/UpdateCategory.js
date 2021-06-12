import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import Admin from '../Admin'
import {withRouter} from 'react-router-dom'

const UpdateCategory = (props) => {

    const history = useHistory()

    const categoryId = props.match.params.categoryId

    const [categoryName, setCategoryName] = useState()
    const [categoryImage, setCategoryImage] = useState()


    useEffect(() => {
        const loadSingleCategory = async () => {
            const token = localStorage.getItem('auth-token')
            const singleCategoryRes = await axios.get(`http://localhost:40/category/${categoryId}`,
                { headers: { 'Authorization': 'Bearer ' + token } })

            setCategoryName(singleCategoryRes.data.data.category_name)
            setCategoryImage(singleCategoryRes.data.data.category_image)
        }
        loadSingleCategory()

    }, [])


    const onCategoryUpdate = async (e) => {
        e.preventDefault()

        try {

            const updateCategory = new FormData() // new line
            updateCategory.append('category_name', categoryName)
            updateCategory.append('category_image', categoryImage)

            const token = localStorage.getItem("auth-token")
            await axios.put("http://localhost:40/category/update/" + categoryId, updateCategory,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Category has been updated.")

            setCategoryName("")
        
            history.push('/admin/category')
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    return (
        <Admin>
            <div style={{padding:"20px 40px"}}>
                <h3>Update Category</h3>
                <form action="" onSubmit={onCategoryUpdate}>
                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Category Name</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                        value={categoryName}
                        onChange={(e)=>setCategoryName(e.target.value)}
                        autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Image</label>
                        <input type="file"
                            name='category_image'
                            className="form-control" 
                            onChange={(e) => setCategoryImage(e.target.files[0])}
                            autoFocus />
                    </div>

                    <button className="btn btn-lg btn-success btn-block text-uppercase">Update</button>

                </form>
            </div>
        </Admin>
    )
}

export default withRouter(UpdateCategory)

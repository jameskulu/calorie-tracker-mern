import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import Admin from '../Admin'

const AddCategory = () => {


    const history = useHistory()

    const [categoryName, setCategoryName] = useState()
    const [image, setImage] = useState('images\\no-image.jpg')


    const onCategoryAdd = async (e) => {
        e.preventDefault()

        try {

            const newCategory = new FormData() // new line
            newCategory.append('category_name', categoryName)
            newCategory.append('category_image', image)

            const token = localStorage.getItem("auth-token")
            await axios.post("http://localhost:40/category/create", newCategory,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("New category has been added.")
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
                <h3>Add Category</h3>
                <form action="" onSubmit={onCategoryAdd}>
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
                            className="form-control"  
                            onChange={(e) => setImage(e.target.files[0])}
                            autoFocus />
                    </div>

                    <button className="btn btn-lg btn-success btn-block text-uppercase">Add</button>

                </form>
            </div>
        </Admin>
    )
}

export default AddCategory

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import Admin from '../Admin'

const AddFood = () => {


    const history = useHistory()
    const [categories, setCategories] = useState([])

    const [foodName, setFoodName] = useState()
    const [foodDescription, setFoodDescription] = useState()
    const [foodCalories, setFoodCalories] = useState()
    const [category, setCategory] = useState("")
    const [image, setImage] = useState('images\\no-image.jpg')


    useEffect(() => {


        const loadCategories = async () => {
            const token = localStorage.getItem('auth-token')
            const categoriesResponse = await axios.get('http://localhost:40/category/retrieve',
                { headers: { 'Authorization': 'Bearer ' + token } })
            const sortedCategoriesResponse = categoriesResponse.data.data.reverse()
            setCategories(sortedCategoriesResponse)
        }

        loadCategories()

    }, [])



    const onFoodAdd = async (e) => {
        e.preventDefault()

        try {

            const newFood = new FormData() // new line
            newFood.append('food_name', foodName)
            newFood.append('food_calories', foodCalories)
            newFood.append('food_image', image)
            newFood.append('food_description', foodDescription)
            newFood.append('category', category)

            const token = localStorage.getItem("auth-token")
            await axios.post("http://localhost:40/food/create", newFood,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("New food has been added.")
            setFoodName("")
            setCategory("")
            setFoodDescription("")
            setFoodCalories("")
        
            history.push('/admin/food')
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    return (
        <Admin>
            <div style={{ padding: "20px 40px" }}>
                <h3>Add Food</h3>
                <form action="" onSubmit={onFoodAdd}>
                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Food Name</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                            required
                            autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Calories</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                            value={foodCalories}
                            required
                            onChange={(e) => setFoodCalories(e.target.value)}
                            autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Description</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                            value={foodDescription}
                            required
                            onChange={(e) => setFoodDescription(e.target.value)}
                            autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Image</label>
                        <input type="file"
                            className="form-control"
                            onChange={(e) => setImage(e.target.files[0])}
                            autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Genre</label>
                        <select name="category"
                            id=""
                            // value={category}
                            value={category}
                            required
                            onChange={(e) => setCategory(e.target.value)}
                            >
                            <option defaultValue value = ""> -- select a category -- </option>
                            
                            {
                                categories.map(category => {
                                    return (
                                        <option key={category._id} value={category.category_name}>{category.category_name}</option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    <button className="btn btn-lg btn-success btn-block text-uppercase">Add</button>

                </form>
            </div>
        </Admin>
    )
}

export default AddFood

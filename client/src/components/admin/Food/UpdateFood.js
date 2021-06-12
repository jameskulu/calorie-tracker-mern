import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import Admin from '../Admin'
import {withRouter} from 'react-router-dom'

const UpdateFood = (props) => {

    const history = useHistory()

    const foodId = props.match.params.foodId
    const [categories, setCategories] = useState([])

    const [foodName, setFoodName] = useState()
    const [foodDescription, setFoodDescription] = useState()
    const [foodCalories, setFoodCalories] = useState()
    const [category, setCategory] = useState()
    const [image, setImage] = useState()


    useEffect(() => {

        const loadCategories = async () => {
            const token = localStorage.getItem('auth-token')
            const categoriesResponse = await axios.get('http://localhost:40/category/retrieve',
                { headers: { 'Authorization': 'Bearer ' + token } })
            const sortedCategoriesResponse = categoriesResponse.data.data.reverse()
            setCategories(sortedCategoriesResponse)
        }

        loadCategories()

        const loadSingleFood = async () => {
            const token = localStorage.getItem('auth-token')
            const singleFoodRes = await axios.get(`http://localhost:40/food/${foodId}`,
                { headers: { 'Authorization': 'Bearer ' + token } })

            setFoodName(singleFoodRes.data.data.food_name)
            setFoodCalories(singleFoodRes.data.data.food_calories)
            setFoodDescription(singleFoodRes.data.data.food_description)
            setCategory(singleFoodRes.data.data.category)
            setImage(singleFoodRes.data.data.food_image)
        }
        loadSingleFood()

    }, [])


    const onFoodUpdate = async (e) => {
        e.preventDefault()

        try {

            const updateFood = new FormData() // new line
            updateFood.append('food_name', foodName)
            updateFood.append('food_calories', foodCalories)
            updateFood.append('food_description', foodDescription)
            updateFood.append('category', category)
            updateFood.append('food_image', image)

            const token = localStorage.getItem("auth-token")
            await axios.put("http://localhost:40/food/update/" + foodId, updateFood,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Food has been updated.")

        
        
            history.push('/admin/food')
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    return (
        <Admin>
            <div style={{padding:"20px 40px"}}>
                <h3>Update Category</h3>
                <form action="" onSubmit={onFoodUpdate}>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Food Name</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                        value={foodName}
                        onChange={(e)=>setFoodName(e.target.value)}
                        autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Calories</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                        value={foodCalories}
                        onChange={(e)=>setFoodCalories(e.target.value)}
                        autoFocus />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Description</label>
                        <input type="text" id="inpuTFirstname" className="form-control"
                        value={foodDescription}
                        onChange={(e)=>setFoodDescription(e.target.value)}
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

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Image</label>
                        <input type="file"
                            name='image'
                            className="form-control" 
                            onChange={(e) => setImage(e.target.files[0])}
                            autoFocus />
                    </div>

                    <button className="btn btn-lg btn-success btn-block text-uppercase">Update</button>

                </form>
            </div>
        </Admin>
    )
}

export default withRouter(UpdateFood)

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link ,withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserContext from '../../../context/UserContext'
import './food-detail.css'
import Arrow from "../../../images/arrow.png"

const FoodDetail = (props) => {
 //data from backend
    const [food, setFood] = useState({})
    const [counter, setCounter] = useState(1)
    const foodId = props.match.params.foodId //id from path
    const { userData, setUserData } = useContext(UserContext)

    useEffect(() => {
        const loadSingleFood = async () => {
            const token = localStorage.getItem('auth-token')
            const singleFoodResponse = await axios.get(`http://localhost:40/food/${foodId}`,
                { headers: { 'Authorization': 'Bearer ' + token } })
            setFood(singleFoodResponse.data.data)
            console.log(singleFoodResponse.data.data)
        }
        loadSingleFood()

    }, [])

//After clicking on add food
    const addFoodDiary = async (e) => {
        e.preventDefault()

        try {
            const newDiary = {
                food_name: food.food_name,
                food_image: food.food_image,
                food_calories: food.food_calories,
                food_description: food.food_description,
                food_quantity: counter,
                food_total_calories: counter * food.food_calories,
                userId: userData.user._id,
                category: food.category
            }
            const token = localStorage.getItem("auth-token")
            await axios.post("http://localhost:40/diary/create", newDiary,
                { headers: { 'Authorization': 'Bearer ' + token } })
            setCounter(1)
            toast.success("Food has been added to diary.")
        }
        catch (err) {
            toast.error("Food Already added")
        }
    }

    const increment = () => {
        setCounter(counter + 1)
    }

    const decrement = () => {
        if(counter > 1){
            setCounter(counter - 1)
        }
        
    }

    return (
        <div className="food-detail mt-4">
          <Link to ="/foods"> <img src={Arrow} alt="Arrow"/> </Link> 

            <div className="outer-food-detail">
                <h1>{food.food_name}</h1>
                <h5 ><Link style = {{ color:"black" }} to={`/category/${food.category}`}>{food.category}</Link></h5>

                <img src={
                    food.food_image ?
                        `http://localhost:40/images/${food.food_image.split("\\")[1]}` : null
                } alt="" />

                <p>{food.food_description}</p>
                <p>Calories: <span>{food.food_calories} Cal</span></p>
                <div>
                    <button id="btndecrement" onClick={decrement}>-</button>
                    <span style={{margin:"0 20px"}}> {counter} </span>
                    <button onClick={increment}>+</button>
                </div>
                <br />
                <button id='addBtn' onClick={addFoodDiary}>Add Food</button>

            </div>
        </div>
    )
}

export default withRouter(FoodDetail)

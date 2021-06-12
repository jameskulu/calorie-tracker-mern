import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Food from '../Homepage/Food'
import {withRouter} from 'react-router-dom'

const CategoryFood = (props) => {

    const [foods, setFoods] = useState([])
    const category = props.match.params.category

    useEffect(() => {
        const loadFoods = async () => {
            const token = localStorage.getItem('auth-token')
            const foodResponse = await axios.get('http://localhost:40/food/retrieve',
            { headers: { 'Authorization': 'Bearer ' + token } })
            setFoods(foodResponse.data.data)
        }
        loadFoods()

    }, [])

    const filteredFood = foods.filter(food => {
        return category === food.category
    })

    return (
        <div>
            <div className="outer-latest-released">
                <h1 style={{marginBottom:"30px"}}>{category}</h1>

                <div className="latest-released">
                    <Food foods={filteredFood} />
                </div>
            </div>
        </div>
    )
}

export default withRouter(CategoryFood)

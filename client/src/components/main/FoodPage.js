import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Food from './Homepage/Food'
import {withRouter} from 'react-router-dom'

function FoodPage(){

  const [food, setFood] = useState([])

  useEffect(() => {

      const loadLatestFoods = async () => {
          const token = localStorage.getItem('auth-token')
          const latestFoodResponse = await axios.get('http://localhost:40/food/retrieve',
              { headers: { 'Authorization': 'Bearer ' + token } })
          const sortedLatestFoodResponse = latestFoodResponse.data.data.reverse()
          setFood(sortedLatestFoodResponse)
      }

      loadLatestFoods()

  }, [])

    return (
      <div>
        <div className="outer-latest-released">
          <div className="latest-released">
            <Food foods={food} />
          </div>
        </div>
      </div>
    )
}

export default withRouter(FoodPage)

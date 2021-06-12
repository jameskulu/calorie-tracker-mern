import axios from 'axios'
import React, { Component, useEffect, useState } from 'react'
import Category from '../Homepage/Category'
import {withRouter} from 'react-router-dom'

function CategoryPage(){

   //data from backend
  const [categories, setCategories] = useState([]) 

  useEffect(() => {
      const loadCategories = async () => {
          const token = localStorage.getItem('auth-token')
          const latestFoodResponse = await axios.get('http://localhost:40/category/retrieve',
              { headers: { 'Authorization': 'Bearer ' + token } })
          const sortedLatestFoodResponse = latestFoodResponse.data.data.reverse()
          setCategories(sortedLatestFoodResponse)
      }

      loadCategories()

  }, [])

    return (
      <div>
        <div className="outer-latest-released">
          <div className="latest-released">
            {/* passing list/props in Category component */}
            <Category cat={categories} />
          </div>
        </div>
      </div>
    )
}

export default withRouter(CategoryPage)

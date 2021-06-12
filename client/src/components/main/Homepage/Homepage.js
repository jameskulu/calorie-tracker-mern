import React, { useEffect, useState } from 'react'
import Home from '../../../images/fruit.jpg'
import Food from './Food'
import './Homepage.css'
import axios from 'axios'
import Category from './Category'
import { Link, withRouter } from 'react-router-dom'

function Homepage() {
    //data from backend
    const [latestFood, setLatestFood] = useState([])
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState()
    const [searchedFood, setSearchedFood] = useState([])

    useEffect(() => { //runs after clicking on Homepage
        const loadLatestFoods = async () => {
            const token = localStorage.getItem('auth-token')
            const latestFoodResponse = await axios.get('http://localhost:40/food/retrieve',
                { headers: { 'Authorization': 'Bearer ' + token } })
            const sortedLatestFoodResponse = latestFoodResponse.data.data.reverse()
            setLatestFood(sortedLatestFoodResponse)
        }
        loadLatestFoods()//asynchronous function

        const loadCategories = async () => {
            const token = localStorage.getItem('auth-token')
            const categoriesResponse = await axios.get('http://localhost:40/category/retrieve',
                { headers: { 'Authorization': 'Bearer ' + token } })
            const sortedCategoriesResponse = categoriesResponse.data.data.reverse()
            setCategories(sortedCategoriesResponse)
        }
        loadCategories()
    }, [])


    const onFoodSearch = async (e) => {
        e.preventDefault()

        if(search === ""){
            setSearchedFood([])
        }
        else{
            try{
                const token = localStorage.getItem('auth-token')
                const searchFoodResponse = await axios.get(`http://localhost:40/food/search?q=${search}`,
                    { headers: { 'Authorization': 'Bearer ' + token } })
                const sortedSearchFoodResponse = searchFoodResponse.data.data.reverse()
                setSearchedFood(sortedSearchFoodResponse)
                console.log(sortedSearchFoodResponse)
            }
            catch(ex){
                console.log(ex)
            }
        }
        
     
    }

    return (
        <div>
            <div className="home col-md-12">
                <div className="hometext col-md-6">
                    <h1>
                        Fitness starts with what you eat.
                        </h1>
                    <Link to="/foods"> <button className="btn btn-success" type="submit">Add food</button></Link>

                    <p>
                        Take control of your goals.
                        Track calories, break down ingredients,
                        and log activities with Healthy Calories.</p>


                </div>
                <div className="col-md-6">
                    <img src={Home} alt="Home" /> </div>

            </div>
            <div className="homepagesearch col-md-12">
                <h1>
                    Search over hundres of foods in our database.<br />
                </h1>
            </div>

            <form className="homesearch col-md-12">
                <input value={search} onChange={e => setSearch(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button onClick={onFoodSearch} type="submit"><i className="fa fa-search"></i></button>
            </form>

            <div className="homepagesearch col-md-12 ">
                <div className="outer-latest-released">
                    {/* <h1>Searched Food</h1> */}
                    <div className="latest-released">
                        <Food foods={searchedFood} />
                    </div>
                </div>
            </div>

            <div className="col-md-12">
                <h4>
                    Learn about calorie count,
                    nutrition information and serving size.
                            </h4>
            </div>

            <div className="homepagesearch col-md-12 ">
                <div className="outer-latest-released">

                    <h1>Categories</h1>

                    <div className="latest-released">
                        <Category cat={categories} />
                    </div>
                </div>
            </div>
            <div className="homepagesearch col-md-12 ">
                <div className="outer-latest-released">
                    <h1>Recently Added</h1>
                    <div className="latest-released">
                        <Food foods={latestFood} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Homepage)

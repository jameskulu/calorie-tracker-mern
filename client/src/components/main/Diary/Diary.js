import React, { useContext, useEffect, useState } from 'react'
import './diary.css'
import UserContext from '../../../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {withRouter} from 'react-router-dom'

const Diary = () => {

    const [diary, setDiary] = useState([])
    const [del, setDel] = useState([])
    const [totalCalories, setTotalCalories] = useState(0)
    const { userData, setUserData } = useContext(UserContext)


    const filteredDiary = diary.filter(dia => {
        if (userData.user) {
            return userData.user._id === dia.userId
        }

    })
    
    useEffect(() => {

        const loadDiary = async () => {
            const token = localStorage.getItem('auth-token')
            const latestDiaryResponse = await axios.get('http://localhost:40/diary/retrieve',
                { headers: { 'Authorization': 'Bearer ' + token } })
            const sortedDiaryResponse = latestDiaryResponse.data.data.reverse()
            setDiary(sortedDiaryResponse)
            
            // sortedDiaryResponse.filter(dr=>{
                
            // })


            sortedDiaryResponse.filter(dia => 
                userData.user._id === dia.userId).map(data =>
                    setTotalCalories(prevData => data.food_total_calories + prevData)
                )

            // filteredDiary.forEach(data=>{
            //     setTotalCalories(prevData => data.food_total_calories + prevData)
            // })
        }

        loadDiary()

    }, [del])


    

    const deleteDiary = async (id) =>{
        try {
            const token = localStorage.getItem("auth-token")
            const deleteResponse = await axios.delete("http://localhost:40/diary/delete/" + id,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Food removed")
            console.log(deleteResponse)
            setDel(prevValue => !prevValue)
            setTotalCalories(0)
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    return (
        <div className='diary'>
            <div className="inner-diary">

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Food Name</th>
                            <th>Calories</th>
                            <th>Quantity</th>
                            <th>Total Calories</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            filteredDiary.map(diary => {
                                return (
                                    <tr key={diary._id}>
                                        <td>

                                            <img
                                                width="100"
                                                height = "80"
                                                src={
                                                    diary.food_image ?
                                                        `http://localhost:40/images/${diary.food_image.split("\\")[1]}` : null
                                                } alt=""
                                            />

                                        </td>
                                        <td>{diary.food_name}</td>
                                        <td>{diary.food_calories} Cal</td>
                                        <td>{diary.food_quantity}</td>
                                        <td>{diary.food_total_calories} Cal</td>
                                        <td onClick={() => {
                                                if (window.confirm('Are you sure want remove this food ?')) {
                                                    deleteDiary(diary._id)
                                                }
                                            }} style={{cursor:"pointer"}}>x</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>

                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong>Total:</strong> {totalCalories} Cal</td>
                            <td></td>
                        </tr>
                    </tfoot>


                </table>

            </div>
        </div>
    )
}

export default withRouter(Diary)

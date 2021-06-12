import {Link,withRouter} from 'react-router-dom'

const Food = ({foods}) => { //getting data from homepage

    return (
        <>
        {foods.map(food => //loop
            <div key={food._id} className="single-latest-released">
                
                <Link to={`/foods/${food._id}`}>
                <img src={`http://localhost:40/images/${food.food_image.split("\\")[1]}`} alt="" /></Link>
                <div className="category-info">
                    {/* path for food page */}
                    <h2><Link to={`/foods/${food._id}`}>
                        {food.food_name}</Link></h2>
                    <span>{food.food_calories} Cal</span>
               </div>
            </div>
        )}
        </>
    )
}

export default withRouter(Food)

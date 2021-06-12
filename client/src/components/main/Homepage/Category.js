import {Link,withRouter} from 'react-router-dom'

const Category = (props) => { //getting data from homepage

    return (
        <>
        {props.cat.map(category => //loop
            <div key={category._id} className="single-latest-released">
                <Link to={`/category/${category.category_name}`}> 
                    <img src={`http://localhost:40/images/${category.category_image.split("\\")[1]}`} alt="" />
                    </Link>
                <div className="category-info">
                    <h2><Link to={`/category/${category.category_name}`}> 
                    {/* path for category page */}
                        {category.category_name}</Link></h2>
                </div>
            </div>
        )}
        </>
    )
}

export default withRouter(Category)

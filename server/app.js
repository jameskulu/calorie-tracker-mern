const express = require('express')
const bodyParser = require('body-parser')
const bcryptjs= require('bcryptjs')
const expressvalidator=require('express-validator')
const cors=require('cors')



//db connection
require('./database/db')

//routes
const route_user=require('./routes/UserRoute')
const route_food=require('./routes/FoodRoute')
const route_category=require('./routes/CategoryRoute')
const route_diary=require('./routes/DiaryRoute')

//middleware
const middleware = require('./middleware/authentication');

const app = express()
app.use(express.json());
app.use(cors());
app.use("/images",express.static("images"))
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(route_user) 
app.use(route_food)
app.use(route_category)
app.use(route_diary)




module.exports = app.listen(40)
const express = require('express')
const router=express.Router();
const Food=require('../models/FoodModel')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/authentication')
const upload = require('../middleware/upload')


// Searching food
router.get('/food/search',async (req,res)=>{
  const q = req.query.q
  try{
    const searchedFood = await Food.find({food_name:{$regex: q, $options: '$i'}})
  
    res.status(200).json({
      success:true,
      msg:"Food searched sucessfully",
      data:searchedFood
    })
  }
  catch(err){
    res.status(400).json({
      success:false,
      msg:err,
    })
  }
})

//creating/inserting food details
router.post("/food/create",auth.verifyAllUser,auth.verifyAdmin,
[
  check('food_name',"You must enter food name.").not().isEmpty(),
  check('food_calories',"You must enter food calories.").not().isEmpty(),
  check('food_description',"You must enter food description.").not().isEmpty(),
  check('category',"You must enter food category.").not().isEmpty(),
],
upload.single('food_image'),
function(req, res){

  if(req.file){
    req.body.food_image = req.file.path;
  }

  const food_image = req.body.food_image
  const food_name=req.body.food_name;
  const food_calories=req.body.food_calories;
  const food_description=req.body.food_description;
  const category=req.body.category;
  // const food_image=req.file.path;

    const foodData = new Food({food_name:food_name,
                               food_calories:food_calories,
                               food_description:food_description,
                               food_image:food_image,
                               category:category});
    foodData.save()
    .then(function(data) { //error handling
      res.status(201).json({
        success:true,
        data:data,
        msg:"Food details has been added."
      })
    })
    .catch(function (error) { //not saved
      res.status(500).json({
        success:false,
        msg: error
      })
    })
  })




//retrieving/fetching data
router.get('/food/retrieve',auth.verifyAllUser,function(req,res){
      Food.find().then(function(data){
          res.status(200).json({
            success:true,
            msg:"Food retrived successfully.",
            data:data
          });
      })
      .catch((err)=>{
          res.ststus(500).json({
            success:false,
            msg:"Error retriving food details"
          })
      })
})


// single food
router.get('/food/:id',auth.verifyAllUser,function(req,res){
  const id = req.params.id
  Food.findById(id).then(function(data){
      res.status(200).json({
        success:true,
        msg:"Single Food retrived successfully.",
        data:data
      });
  })
  .catch((err)=>{
      res.status(500).json({
        success:false,
        msg:"Error retriving food details"
      })
  })
})
  

  //deleting data
  router.delete('/food/delete/:id',auth.verifyAllUser,auth.verifyAdmin,function(req,res){
    const id=req.params.id;
    Food.deleteOne({_id : id}).then(function(data){
      res.status(200).json({
        success:true,
        msg:"Food deleted.",
        data:data
      })
    })
    .catch(function(err){
        res.status(500).json({
          success: false,
          msg:err
        })
    })
      })

   //Updating food 
   router.put("/food/update/:id", auth.verifyAllUser,upload.single("food_image"), async (req, res) => {

    if (req.file == undefined) {
      req.body.food_image = 'uploads\\no-image'
     }
     else{
      req.body.food_image = req.file.path;
     }
  
    const data = req.body;
    
    try {
      const updatedFood = await Food.findByIdAndUpdate(req.params.id, data, {
        new: true,
      })
  
      res.status(200).json({
        success:true,
        data:updatedFood,
        msg : "Food Updated successfully."
      });
    } catch (err) {
      res.status(400).json({
        success:false,
        msg : err
      });
    }
  });
      
  module.exports = router;
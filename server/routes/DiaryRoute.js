const express = require('express')
const router=express.Router();
const Diary=require('../models/Diary')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/authentication')
const upload = require('../middleware/upload')


//retrieving/fetching data
router.get('/diary/retrieve',auth.verifyAllUser,function(req,res){
    Diary.find().then(function(data){
        res.status(200).json({
          success:true,
          msg:"Diary Food retrived successfully.",
          data:data
        });
    })
    .catch((err)=>{
        res.ststus(500).json({
          success:false,
          msg:"Error retriving diary food"
        })
    })
})


//creating/inserting food details
router.post("/diary/create",auth.verifyAllUser,upload.single('food_image'),function(req, res){

  if(req.file){
    req.body.food_image = req.file.path;
  }

  const food_name=req.body.food_name;
  const food_calories=req.body.food_calories;
  const food_quantity=req.body.food_quantity;
  const food_total_calories=req.body.food_total_calories;
  const food_description=req.body.food_description;
  const category=req.body.category;
  const food_image = req.body.food_image
  const userId=req.body.userId;
  // const food_image=req.file.path;

    const foodData = new Diary({food_name:food_name,
                               food_calories:food_calories,
                               food_quantity:food_quantity,
                               food_image:food_image,
                               food_total_calories:food_total_calories,
                               userId:userId,
                               food_description:food_description,
                               category:category});
    foodData.save()
    .then(function(data) { //error handling
      res.status(201).json({
        success:true,
        data:data,
        msg:"Fod has been added to diary."
      })
    })
    .catch(function (error) { //not saved
      res.status(500).json({
        success:false,
        msg: error
      })
    })
  })




  //Deleting a food diary
router.delete("/diary/delete/:id", auth.verifyAllUser, async (req, res) => {
  try {
    const deletedDiary = await Diary.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
      success:true,
      data:deletedDiary,
      msg : "Diary deleted successfully."
    });
  } catch (err) {
      res.status(400).json({
      success:false,
      msg:err
    });
  }
});



module.exports = router
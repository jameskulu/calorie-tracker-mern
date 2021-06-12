
const express = require('express')
const router=express.Router();
const Category=require('../models/CategoryModel')
const {check, validationResult}=require('express-validator')
const auth = require('../middleware/authentication')
const upload = require('../middleware/upload');
const { response } = require('express');

//creating/inserting category details
router.post("/category/create",auth.verifyAllUser,auth.verifyAdmin,
[
  check('category_name',"You must enter category name.").not().isEmpty(),
],
upload.single('category_image'),
(req, res) => {
  if(req.file){
    req.body.category_image = req.file.path;
  }

  const category_image = req.body.category_image
  const category_name=req.body.category_name;
  // const category_image=req.file.path;

    const categoryData = new Category({category_name:category_name,category_image:category_image});
    categoryData.save()
    .then(function(data) { //error handling
      res.status(201).json({
        success:true,
        data:data,
        msg:"Category has been added."
      })
    })
    .catch(function (error) { //not saved
      res.status(500).json({
        msg: error,
        success:false
      })
    })
  })


//retrieving/fetching data
  router.get('/category/retrieve',auth.verifyAllUser,function(req,res){
      Category.find().then(function(data){
          res.status(200).json({
            success:true,
            data:data,
            msg:"Category retrieved successfully"
          });
      })
      .catch((err)=>{
        res.status(500).json({
          success:true,
          msg:"Error retriving"
        });
      })
  })
  
  
// single food
router.get('/category/:id',auth.verifyAllUser,function(req,res){
  const id = req.params.id
  Category.findById(id).then(function(data){
      res.status(200).json({
        success:true,
        msg:"Single Category retrived successfully.",
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

  //deleting data
  router.delete('/category/delete/:id',auth.verifyAllUser,auth.verifyAdmin,function(req,res){
    const id=req.params.id;
    Category.deleteOne({_id : id})
    .then(function(data){
      res.status(200).json({
        success:true,
        data:data,
        msg:"Category deleted."
      })
    })
    .catch(function(err){
        res.status(500).json({
          msg:"Error deleting",
          success:false
        })
      })
    })


  //updating data  
    router.put('/category/update/:id',auth.verifyAllUser,auth.verifyAdmin,upload.single("category_image"), async function(req,res){
      if (req.file == undefined) {
        req.body.category_image = 'uploads\\no-image'
       }
       else{
        req.body.category_image = req.file.path;
       }
    
      const data = req.body;
      
      try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, data, {
          new: true,
        })
    
        res.status(200).json({
          success:true,
          data:updatedCategory,
          msg : "Category Updated successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          msg : err
        });
      }
      })
      
  module.exports = router;
const express = require('express')
const router=express.Router();
const User=require('../models/UserModel')
const bcryptjs= require('bcryptjs')
const {check, validationResult}=require('express-validator')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authentication')
const upload = require('../middleware/upload')


//registering/inserting user (sign up)
router.post("/user/register",
 [
   //validation
  check('fname',"Must add a first name.").not().isEmpty(),
  check('lname',"Must add a second name.").not().isEmpty(),
  check('username',"Must add a user name.").not().isEmpty(),
  check('email',"Must add an email.").not().isEmpty(),
  check('password',"Must add a password.").not().isEmpty(),

  check('email',"Invalid email.").isEmail(),
  check('fname',"Length must be more than 2.").isLength({"min":2})

],
async (req, res) => {
  const errors= validationResult(req);
  // console.log(errors.array())

  if(!errors.isEmpty()){ //error from user
    res.status(400).json(errors.array())

  }
else{ //error free

  const fname=req.body.fname;
  const lname=req.body.lname;
  const username=req.body.username;
  const password=req.body.password;
  const email=req.body.email;
  const role=req.body.role;
  // const height=req.body.height;
  // const weight=req.body.weight;


 const usernameExists = await User.findOne({ username: username })

  if(usernameExists){
    return res.status(400).json({success:false,msg:'Username already taken'})
  }

  const emailExists = await User.findOne({ email: email })

  if(emailExists){
    return res.status(400).json({success:false,msg:'Email already taken'})
  }

  //encrypting password
  bcryptjs.hash(password,10,function(err, hash){


    const myData = new User({
      fname:fname,
      lname:lname,
      username:username,
      email:email,
      password:hash,
      role:role,
      // height:height,
      // weight:weight
    });

    myData.save()
    .then(function(data) { //error handling
     


      const token= jwt.sign({userId:data._id},'secretkey');
      res.status(201).json({
        success:true,
        msg:"User has been created.",
        token:token
      })
    })
    .catch(function (error) { //not saved
      res.status(500).json({
        success:false,
        msg: error
      })
    })
  })
}
})


//login
router.post('/user/login', function(req,res){
  const username= req.body.username;//get data from user
  const password=req.body.password;

  User.findOne({username:username})
  .then(function(userdata){
    if(userdata===null){//if data in db is null
      return res.status(403).json({success:false,msg:"Invalid username or password."})
    }
    bcryptjs.compare(password,userdata.password,function(err,result){//comparing with password in the database
      if(result===false){
        return res.status(403).json({success:false,msg:"Invalid username or password."})
      }

     // valid username and password
     const token= jwt.sign({userId:userdata._id},'secretkey');
     res.status(200).json({
       success:true,
       msg:"Login successful.",
       token:token,
       user:userdata
      })
    })
  })
  .catch(function (error) { //not saved
    res.status(500).json({
      success:false,
      msg: "Login error!"
    })
  })
})


//retrieving/fetching data
  router.get('/user/retrieve',auth.verifyAllUser,function(req,res){
      User.find()
      .then(function(data){
          res.status(200).json({
            success:true,
            msg:"User retrieved successfully",
            data:data
          });
      })
      .catch(function (error) { //not saved
        res.status(500).json({
          success:false,
          msg: "Error fetch error!"
        })
      })
  
  })

   
// single user
router.get('/user/:id',auth.verifyAllUser,function(req,res){
  const id = req.params.id
  User.findById(id).then(function(data){
      res.status(200).json({
        success:true,
        msg:"Single User retrived successfully.",
        data:data
      });
  })
  .catch((err)=>{
      res.ststus(500).json({
        success:false,
        msg:"Error retriving user details"
      })
  })
})
  

  //deleting data
  router.delete('/user/delete/:id',auth.verifyAllUser,function(req,res){
    const id=req.params.id;
    User.deleteOne({_id : id})
    .then(function(data){
        res.status(200).json({
          msg:"User deleted.",
          data:data,
          success:true
        })
      })
      .catch(function(err){
        res.status(500).json({
          success:false,
          msg:"Error deleting user"
          })
      })
    })


    //Updating user 
router.put("/user/update/:id", auth.verifyAllUser,upload.single("user_image"), async (req, res) => {

  if (req.file == undefined) {
    req.body.user_image = 'uploads\\no-image.jpg'
   }
   else{
    req.body.user_image = req.file.path;
   }

  const data = req.body;
  
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    })

    res.status(200).json({
      success:true,
      data:updatedUser,
      msg : "Profile Updated successfully."
    });
  } catch (err) {
    res.status(400).json({
      success:false,
      msg : err
    });
  }
});


router.post("/user/tokenIsValid", async (req, res) => {

  if (!req.headers.authorization) {
    return res.status(401).json(false);
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.json(false);

    const verified = jwt.verify(token, 'secretkey');
    if (!verified) return res.json(false);

    const user = await User.findById(verified.userId);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/user", auth.verifyAllUser, async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json(user)
})



      
module.exports = router;
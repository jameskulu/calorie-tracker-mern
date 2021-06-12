const jwt = require('jsonwebtoken');
const User=require('../models/UserModel')

module.exports.verifyAllUser = function(req, res, next){
    try{
        const verifyToken = req.headers.authorization.split(" ")[1]; //user's token
        const decodeData = jwt.verify(verifyToken,'secretkey');
        User.findOne({_id:decodeData.userId})
        .then(function(result){ //validate
            req.user=result
            next()
         })
        .catch(function(err){ //error
            res.status(401).json({msg:err})
        })
    
    }
    catch(err){
        res.status(401).json({msg:"UNAUTHORIIZED ACCESS!"})
    }
}

module.exports.verifyUser = function(req,res,next){

        if(!req.user){ //unauthorized
            return res.status(401).json({msg: "Unauthorized access!"})
        }
        else if(req.user.role!=='User'){
            return res.status(401).json({msg: "Unauthorized User!"})
        }
        next();
    
}


module.exports.verifyAdmin = function(req,res,next){
    
        if(!req.user){ //unauthorized user
            return res.status(401).json({msg: "Unauthorized access!"})
        }
        else if(req.user.role!=='Admin'){
            return res.status(401).json({msg: "Unauthorized Admin!"})
        }
        next();
    
}

// step 1 : get the token (ticket) from the client
// step 2 : verify the token
// step 3 : false - return with error message
// step 4 : true - get the id from token
// step 5 : fetch all the information from databas using this id
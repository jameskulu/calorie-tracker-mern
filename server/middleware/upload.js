const multer=require('multer');
const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./images')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ file.originalname)
    }
});

const fileFilter = function(req,file,next){
    
    if(file.mimetype=='image/jpeg' || file.mimetype=='image/jpg' || file.mimetype=='image/png'||file.mimetype=='image/gif'||file.mimetype=='image/jfif'){ //takes jpeg image

        next(null,true);
    }
    else{
        next({message:"File type not supported"},false);
    }
}


const upload=multer({
    storage:storage,
    fileFilter:  fileFilter
});


module.exports=upload;
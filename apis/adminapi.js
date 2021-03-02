const exp=require("express");
const adminApiObj=exp.Router();
const bcryptjs=require("bcryptjs");
const errorHandler=require("express-async-handler");
const { ErrorHandler } = require("@angular/core");
const jwt=require("jsonwebtoken");
//import 
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")
//configure cloudinary
cloudinary.config({
    cloud_name: 'dtrhafbol',
    api_key: '471847945156575',
    api_secret: 'H7vKMedZ5nAeWlIjbjtNebdk3OY'
});
//configure cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});
//congigure multer
var upload = multer({ storage: storage });
//extract body of req obj
adminApiObj.use(exp.json())


adminApiObj.post("/productdetails",upload.single('photo'),errorHandler(async (req,res,next)=>{
    console.log("url is ",req.file.path);
    //get user collectionobject

    let productCollectionObj=req.app.get("productCollectionObj");
   console.log("user details obj is",req.body)
   let proObj=JSON.parse(req.body.proObj);
    //add userImagelink
    proObj.userImgLink = req.file.path;
let success=await productCollectionObj.insertOne(proObj)
        res.send({message:"user created"})

    
}))
adminApiObj.get("/getlist",errorHandler(async (req,res,next)=>{
    let productCollectionObj = req.app.get("productCollectionObj") 
  
    let proObj=await productCollectionObj.find().toArray();
    console.log("list is",proObj);

    res.send({message:"success",list:proObj})
    
    }))
    adminApiObj.post("/delete",errorHandler(async(req,res,next)=>{
    
        let productCollectionObj = req.app.get("productCollectionObj");
        let productObj =  req.body;
        
        console.log("user object is",productObj);
        //check for user in db
        let product = await productCollectionObj.findOne({pname:productObj.pname});
    
        //if username alreaddy taken
        if(product!==null){
            let remove=await productCollectionObj.deleteOne({pname:productObj.pname});
            res.send({message:true});
        }
    
    }))
    adminApiObj.get("/oneproduct/:pname",errorHandler(async(req,res,next)=>{
    
        let productCollectionObj = req.app.get("productCollectionObj");
        console.log("hai..",req.body);
        let products = await productCollectionObj.findOne({pname:req.params.pname});
        console.log("here..",products);
        res.send({message:products})
    }))
   
  
    


module.exports=adminApiObj;
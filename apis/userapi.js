const exp=require("express");
const userApiObj=exp.Router();
const bcryptjs=require("bcryptjs");
const errorHandler=require("express-async-handler");
const { ErrorHandler } = require("@angular/core");
const jwt=require("jsonwebtoken");
//extract body of req obj
userApiObj.use(exp.json())
//GET REQ handler
userApiObj.post("/register",errorHandler(async (req,res,next)=>{
   
    //get user collectionobject

    let userCollectionObj=req.app.get("userCollectionObj");
   console.log("user obj is",req.body)
   let userObj=req.body;
   console.log(userObj)

    let user=await userCollectionObj.findOne({username:userObj.username})

    if(user!==null){
        res.send({message:"user existed"})

    }
    else{
        //hash the password
        let hashedpw=await bcryptjs.hash(userObj.password,6)
        //replace plain text pw with hased pw
        userObj.password=hashedpw;
        //create user

        let succes=await userCollectionObj.insertOne(userObj)
        res.send({message:"success"})

    }
}))

//user login
userApiObj.post("/login",errorHandler(async (req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj");
    let userCredobj=req.body;

    //verify username
    let user=await userCollectionObj.findOne({username:userCredobj.username})
    
    if(user==null){
           res.send({"message":"invalid username"})
    }
    else{

        //verify password

        let status=await bcryptjs.compare(userCredobj.password,user.password)
         //if pas matched
        if(status==true){
            //create a token

            let token=await jwt.sign({username:user.username},process.env.secret,{expiresIn:10})
  

            //send token
            
            res.send({message:"success",signedToken:token,username:user.username})
        }
        else{
            res.send({message:"invalid password"})
        }
    }


}))
userApiObj.post("/addtocart",errorHandler(async(req,res,next)=>{

    console.log("the cart obj is ",req.body)
    let cardCollectionObj= req.app.get("cardCollectionObj");

    let cartObj=req.body;
    let product=await cardCollectionObj.findOne({productname:cartObj.productname})
    if(product==null){

    await cardCollectionObj.insertOne(cartObj);
    res.send({message:"success"})
    }
    else{
        res.send({message:"product exist"})
    }

    
}))
userApiObj.get("/getcartitems/:username",errorHandler(async(req,res,next)=>{

    let cardCollectionObj = req.app.get("cardCollectionObj");
    
    let products = await cardCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:products})
    
    //console.log(products)
}))
userApiObj.post("/viewitem",errorHandler(async(req,res,next)=>{
    let productCollectionObj=req.app.get("productCollectionObj");
    console.log("In ViewItem ",req.body)
    let Obj=req.body;
    console.log(Obj.pname);
    let viewItem=await productCollectionObj.findOne({pname:Obj.pname});
    console.log("view item is",viewItem);
    if(viewItem){
        //create a token
        let token = await jwt.sign({productname:viewItem.pname},"abcd",{expiresIn:10});

        //send token
        res.send({message:true,signedToken:token,productname:viewItem.pname});
    }
    
}))
userApiObj.post("/deleteproduct",errorHandler(async(req,res,next)=>{
    
    let cardCollectionObj = req.app.get("cardCollectionObj");
    let cartObj =  req.body;
    
    //console.log("user object is",cartObj);
    //check for user in db
    let product = await cardCollectionObj.findOne({productname:cartObj.productname});

    //product is there
    if(product!==null){
        let remove=await cardCollectionObj.deleteOne({productname:cartObj.productname});
        res.send({message:true});
    }

}))
module.exports=userApiObj;
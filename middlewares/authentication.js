const jwt=require("jsonwebtoken")
const User=require("../models/user")
const blacklist=require("./blacklist")
require("dotenv").config()
const authmiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1]
        if(blacklist.includes(token)){
            res.send("please log in again")
        }
        const decodedToken=jwt.verify(token,process.env.key)
        const {userID}=decodedToken
        const user=await User.findById(userID)
        if(!user){
            res.sen("unauthorized")
        }
        req.user=user
        next()
    } catch (error) {
        res.send({msg:"unauthorizes",err:error.message})

        
    }
};
module.exports=authmiddleware
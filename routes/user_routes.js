const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/user")
const blacklist=require("../middlewares/blacklist")
require("dotenv").config()

router.post("/signup",async(req,res)=>{
    const{username,email,password,role}=req.body;
try {
    const userexist=await User.findOne({email})
    if(userexist){
        res.send("user already exists")
    }
    const user=new User({username,email,password,role})
    await user.save()
    res.send({user})
} catch (error) {
    console.log(error);
    res.send("something went wrong")
}

})
router.post("/login",async(req,res)=>{
    const{email,password}=req.body;
try {
    const user=await User.findOne({email})
    if(!user){
        res.send("wrong email")
    }
  const passmatch=await bcrypt.compare(password,user.password)
  if(!passmatch){
    res.send("password doesn't match")
  }
  const token=jwt.sign({userID:user._id},process.env.key,{
    expiresIn:60
  })
  const refresstoken=jwt.sign({userID:user._id},process.env.refresskey,{
    expiresIn:300
  })
  res.send({token,refresstoken})
} catch (error) {
    console.log(error);
    res.send("something went wrong")
}

})
router.get("/newtoken",(req,res)=>{
    const ref_token=req.headers.authorization.split(" ")[1]
    if(!ref_token){
        res.send("please login first")
    }
    jwt.verify(ref_token,process.env.refresskey,(err,decoded)=>{
        if(err){
            res.send("please login again")
        }else{
            const token=jwt.sign({userID:decoded.userID},process.env.key,{
                expiresIn:60
            })
            res.send({token})
        }
    })
})
router.get("/logout",(req,res)=>{
    blacklist.push(req.headers?.authorization?.split(" ")[1])
    res.send("logout successfull")

})
module.exports=router
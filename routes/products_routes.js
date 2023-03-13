const express=require("express")
const router=express.Router()
const Product=require("../models/user")
const {authorise} = require("../middlewares/authorise")
const authmiddleware=require("../middlewares/authentication")





router.get("/products", authmiddleware,authorise(["customer","seller"]),async(req,res)=>{
    const payload=req.query
    try {
       const user=await Product.find(payload)
       res.send(user)
        
    } catch (error) {
        console.log(error);
        
    }
})
router.post("/addproducts", authmiddleware,authorise(["seller"]),async(req,res)=>{
    const {name,age,clas,city}=req.body
    try {
        const x=new Product({name,age,clas,city})
        await  x.save()
    } catch (error) {
        console.log(error);
    }
})

router.patch("/edit/:id", authmiddleware,authorise(["seller"]),async(req,res)=>{
    const Id=req.params.id
    const body=req.body
    try {
      await Product.findByIdAndUpdate({_id:Id},body)
      res.send("data has been edited")
    } catch (error) {
        console.log(error);
    }
})
router.delete("/deleteproducts/:id", authmiddleware,authorise(["seller"]),async(req,res)=>{
    const Id=req.params.id
 
    try {
     await Product.findByIdAndUpdate({_id:Id})
      res.send("data has been deleted")
    } catch (error) {
        console.log(error);
    }
})
module.exports=router

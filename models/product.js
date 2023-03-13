const mongoose=require("mongoose")
const productschema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    des:{type:String,required:true},
    rating:{type:Number,required:true}
    
})
const Product=mongoose.model("product",productschema)
module.exports=Product
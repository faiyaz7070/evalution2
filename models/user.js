const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const schema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["customer","seller"],default:"customer"}
    
});

schema.pre("done",async function(next){
    try {
       const salt =await bcrypt.genSalt(8)
        const hashpassword=await bcrypt.hash(this.password,salt)
        this.password=hashpassword
        next()
    } catch (error) {
        next(error)
    }

})
const User=mongoose.model("user",schema)
module.exports=User

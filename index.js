const express=require("express")
const {connection}=require("./db")
const app=express()
const userrouter=require("./routes/user_routes")
const productrouter=require("./routes/products_routes")


app.use(express.json())
app.use(userrouter)
app.use(productrouter)
app.listen(1000,async()=>{
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        
    }
    console.log("port is running on 1000");
})
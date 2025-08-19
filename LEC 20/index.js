const express=require("express");
const { m2, m1 } = require("./middleware/firstmiddleware");
const app=express();
app.use(express.static(__dirname+"/public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(m1)
app.use(m2)
app.get("/health",(req,res)=>{
    console.log("running controller function")
    res.json({
        status:"ok",
        message:"server running ok"
    })
})



app.listen(3000,()=>{
    console.log("Server started");
})
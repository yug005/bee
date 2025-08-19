const express=require("express");
const { m2, m1 } = require("./middleware/firstmiddleware");
const { m3 } = require("./middleware/pathlevel");
const app=express();
app.use(express.static(__dirname+"/public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(m1)
app.get("/health", m3, (req,res,next)=>{
    console.log("running controller function");
    // next();
    return res.json({
        status:"ok",
        message:"server running ok"
    })
    // console.log("after response")
})
app.use(m2)
app.get("/home", (req, res, next) => {
    console.log("running home endpoint");
    next();
    return res.json({
        status: "ok",
        message: "welcome to home page"
    })
})




app.listen(3000,()=>{
    console.log("Server started");
})

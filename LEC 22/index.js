const express = require("express");
const mongoose=require("mongoose");
const app = express();
const User = require("./model/useres");
const jwt = require("jsonwebtoken");
console.log(User);
function isLogin(req,res,next){
    let token = req.headers["authorization"];
    if(!req.headers["authorization"]){
        return res.json({
            success:false,
            message:"no authentication key provided"
        })
    }
    console.log(token);
    if(!token){
        return res.json({
            success:false,
            message:"plz login to access "
        })
    }
    let decoded = jwt.verify(token,"okkkk");
    console.log(decoded);
    if(!decoded){
        return res.json({
            success:false,
            message:"Invalid token"
        })
    }
    req.userId = decoded.user;
    next();
}

app.use(express.json());

app.get("/health", (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  res.json({ status: "OK", message: "server running ok" });
});
app.get("/home", isLogin, async(req, res) => {
    let user=await User.findById(req.userId)
    console.log(user)
    let username = user.name;

    console.log("running ok")
  res.json({ success: true, message: "Welcome to the home page" +" "+ username });

});

//end point for signup -- ading new user into db
app.post("/api/users/signup",async (req,res) => {
    try{
        let {name,email,password} = req.body;
        let userExist =  await User.findOne({email:email})
        if(userExist){
            return res.json({success:false,message:"User already exists with this email please login"})
        }
        let newUser = new User({name:name,email:email,password:password});
        await newUser.save();
        res.json({
            success:true,
            message:"User registred successfully, please login to continue"
        })
    }
    catch(err){
        console.log(err.message);
        res.json({success:false,message:"Internal server error"});
    }
});

app.post("/api/auth/login",async(req,res)=>{
    try{
    const{email,password}= req.body;
    let userExist = await User.findOne({email:email});
    if(!userExist){
        return res.json({
            success:false,
            message:"user does not exist please signup"
        })
    }
    if(userExist.password!=password){
        return res.json({
            success:false,
            message:"Invalid pass, plz try again"
        })
    }
    if(userExist.password==password){
        let token = jwt.sign({"user":userExist._id},"okkkk");
        return res.json({
            success:true,
            message:"user login",
            token
        })
    }
}
catch(err){
    console.log(err);
    res.json({
        error:{
            message:err.message
        }
    })
}
})   

mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => {console.log('Connected!')
    
  })
  .catch(err => {
    console.log(err.message)
  });


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGFkN2M2NzJiM2RiMGMyNTliYTMzZjEiLCJpYXQiOjE3NTYyMDAwNjcsImV4cCI6MTc1NjIwMzY2N30.RCrBbjgmwSwwoBT87DvGOcr9tgxvWLPApt1xUTK76nc
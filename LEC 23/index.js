const express = require("express");
const mongoose= require("mongoose")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const Blogs= require("./model/blog");
const user = require("./model/user");
const jwt = require("jsonwebtoken")
const secret_key = "my secret key";

function isLogin(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }
  try {
    token = token.split(" ")[1]; 
    let decoded = jwt.verify(token, secret_key);
    req.userId = decoded.userId;   
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

app.post("/login", async (req,res)=>{
   let { email, password } = req.body; 
  let userExist = await user.findOne({email,password});
  if(!userExist){
    return res.json({
      success:false,
      message:"Invalid email or password"
    })
  }
  let token = jwt.sign(
    { userId: userExist._id }, 
    secret_key, 
    { expiresIn: "1h" }
  );
  res.json({
    success:true,
    data:token,
    message:"Login successful"
  });
})

app.post("/blogs", isLogin, async(req,res)=>{
  let {title,body}  = req.body;
  let userExist= await user.findById(req.userId);
  if(userExist){
   let newBlog=new Blogs({
    title:title,
    body:body,
    date: Date.now(),
    userId:req.userId
   })
  await newBlog.save()
  userExist.blogs.push(newBlog._id)
  await userExist.save();
  res.json({
    success:true,
    data:newBlog,
    message:"blog added successfully"
  })
}
})

app.get("/blogs",isLogin,async(req,res)=>{
   let allblog= await Blogs.find();
   res.json({
        success:true,
        data:allblog
   }) 
})

app.get("/blogs/:id",isLogin,async(req,res)=>{
    let {id}= req.params
    let blog= await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })
})

app.post("/users",async(req,res)=>{
  let {username,email,password}  = req.body;
   let newUser=new user({
    username,
    email,
    password
   })
  await newUser.save()
  res.json({
    success:true,
    data:newUser,
    message:"blog added successfully"
  })
})

app.get("/users",async(req,res)=>{
   let allusers= await user.find();
   res.json({
        success:true,
        data:allusers
   }) 
})

app.get("/users/:id",async(req,res)=>{
    let {id}= req.params
    let userExist= await user.findOne({_id:id}).populate("blogs")
    if(userExist){
    res.json({
        success:true,
        data:userExist
    })
  }
})

app.delete("/blogs/:blogId",isLogin,async(req,res)=>{
  let {blogId}= req.params;
  let blogExist = await Blogs.findById(blogId);
  if(!blogExist) return res.json({
    success:false,
    message:"Blog does not exist"
  })
  if(blogExist.userId!=req.userId) return res.json({
    success:false,
    message:"You are not allowed to delete this blog"
  })
  await Blogs.findByIdAndDelete(blogId);
  let userExist = await user.findById(req.userId);
  let blog= userExist.blogs.filter((id)=> id!=blogId)
  userExist.blogs=blog
  await userExist.save();
  res.json({
    success:true,
    message:"blog deleted successfully",
    data:userExist
  })
})

app.listen(3000,()=>{
    console.log("server started")
})
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
  
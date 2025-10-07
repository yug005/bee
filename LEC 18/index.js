const express = require("express");
const mongoose= require("mongoose")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const Blogs= require("./model/blog");
const user = require("./model/user");
app.post("/blogs",async(req,res)=>{
  let {title,body,userId}  = req.body;
  let userExist= await user.findById(userId);
  if(userExist){
   let newBlog=new Blogs({
    title:title,
    body:body,
    date: Date.now(),
    userId:userId
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
app.get("/blogs",async(req,res)=>{
   let allblog= await Blogs.find();
   res.json({
        success:true,
        data:allblog
   }) 
})
app.get("/blogs/:id",async(req,res)=>{
    let {id}= req.params
    let blog= await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })
})
//user
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


//delete blog
app.delete("/blogs/:blogId",async(req,res)=>{
  let {blogId}= req.params;
  let  {userId}= req.body;
  let blogExist = await Blogs.findById(blogId);
  if(!blogExist) return res.json({
    success:false,
    message:"Blog doest not exist"
  })
  if(blogExist.userId!=userId) return res.json({
    success:false,
    message:"You are not allowed to delete this blog"
  })
  await Blogs.findByIdAndDelete(blogId);
  console.log("aaaaaaaaaaaaaaaaaaaaaa")
  let userExist = await user.findById(userId);
  let blog= userExist.blogs.filter((id)=> id!=blogId)
  userExist.blogs=blog
  await userExist.save();
  console.log("bbbbbbbbbbbbbbb")
  res.json({
    success:true,
    message:"blog deleted successfully",
    data:userExist
  })
})



app.listen(4455,()=>{
    console.log("server started")
})
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
const express = require("express");
const router = express.Router();// small-> app

router.post("/blogs",async(req,res)=>{
    let {title,body,userId}=req.body;
    let userExists=await Users.findById(userId);
    if(userExists){
      let newBlog=new Blogs({
        title:title,
        body:body,
        date:Date.now(),
        userId:userId
    })
    await newBlog.save();
    userExists.blogs.push(newBlog._id);
    await userExists.save();
    res.json({
        success:true,
        data:newBlog,
        message:"blog added successfully!!!"
    })
    }
})

router.get("/blogs",async(req,res)=>{
    let allblog=await Blogs.find();
    res.json({
        success:true,
        data:allblog
    })
})

router.get("/blogs/:id",async(req,res)=>{
    let {id}=req.params
    let blog=await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })
})
//DELETE BLOG
router.delete("/blogs/:blogId",async (req,res)=>{
  let {blogId}=req.params;
  let {userId}=req.body;
  let blogExists=await Blogs.findById(blogId);
  if(!blogExists) return res.json({
    success:false,
    message:"Blog doesn't exists"
  })
  if(blogExists.userId!=userId)({
    success:false,
    message:"You are not allowed to delete the blog"
  })
  await Blogs.findByIdAndDelete(blogId);
  let userExist=await Users.findById(userId);
  let blog=userExist.blogs.filter((id)=> id!=blogId);
  userExist.blogs=blog;
  await userExist.save();
  res.json({
    success:true,
    message:"Blog deleted successfully",
    data:userExist
  })
})

//UPDATE BLOG
router.put("/blogs/:blogId",async (req,res)=>{
  let {blogId}=req.params;
  let {title,body,userId}=req.body;
  let blogExists1=await Blogs.findById(blogId);
  if(!blogExists1) return res.json({
    success:false,
    message:"Blog doesn't exists"
  })
  if(blogExists1.userId!=userId)({
    success:false,
    message:"You are not allowed to delete the blog"
  })
  let updatedBlog = await Blogs.findByIdAndUpdate(blogId,{ title, body } );
  res.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog
    });
})

module.exports = router;
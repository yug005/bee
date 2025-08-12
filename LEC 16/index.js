const express=require("express");
const mongoose=require("mongoose");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const Blogs=require("./model/users")
const Users=require("./model/users")

app.post("/blogs",async(req,res)=>{
    let {title,body}=req.body;
    let newBlog=new Blogs({
        title:title,
        body:body,
        date:Date.now()
    })
    await newBlog.save()
    res.json({
        success:true,
        data:newBlog,
        message:"blog added successfully!!!"
    })
})

app.get("/blogs",async(req,res)=>{
    let allblog=await Blogs.find();
    res.json({
        success:true,
        data:allblog
    })
})

app.get("/blogs/:id",async(req,res)=>{
    let {id}=req.params
    let blog=await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })
})

app.post("/users", async (req, res) => {
  let { email, username, password } = req.body;
  let newUser = new Users({
    email: email,
    username: username,
    password: password
  });
  await newUser.save();
  res.json({
    success: true,
    data: newUser,
    message: "user added successfully!!!"
  });
});

app.get("/users", async (req, res) => {
  let allUsers = await Users.find();
  res.json({
    success: true,
    data: allUsers
  });
});

app.get("/users/:id", async (req, res) => {
  let { id } = req.params;
  let user = await Users.findOne({ _id: id });
  res.json({
    success: true,
    data: user
  });
});

app.listen(3000,()=>{
    console.log("Server started");
})
+
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
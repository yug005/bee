const express=require("express");
const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"))
const Blogs=require("./model/user")
const Users=require("./model/userSchema")
console.log(Blogs,Users)
function isLogin(req, res, next) {
  let token = req.headers.authorization; 

  if (!token) {
    return res.json({
      success: false,
      message: "Please login first"
    });
  }

  try {
    let decode = jwt.verify(token, "okk"); 
    req.userId = decode.userId; 
    next();
  } catch (err) {
    return res.json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}
// LOGIN
app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await Users.findOne({ email, password }); 
  if (!user) {
    return res.json({
      success: false,
      message: "Invalid email or password"
    });
  }

  // create token
  let token = jwt.sign({ userId: user._id }, "okk");

  res.json({
    success: true,
    message: "Login successful",
    token: token
  });
});


// Adding a blog 
app.post("/blogs", isLogin, async (req, res) => {
  let { title, body } = req.body;
  let userId = req.userId;  

  let userExists = await Users.findById(userId);
  if (userExists) {
    let newBlog = new Blogs({
      title: title,
      body: body,
      date: Date.now(),
      userId: userId
    });

    await newBlog.save();
    userExists.blogs.push(newBlog._id);
    await userExists.save();

    res.json({
      success: true,
      data: newBlog,
      message: "Blog added successfully!!!"
    });
  }
});

//getting all blogs
app.get("/blogs",async(req,res)=>{
    let allblog=await Blogs.find();
    res.json({
        success:true,
        data:allblog
    })
})
//getting single blog by id
app.get("/blogs/:id",async(req,res)=>{
    let {id}=req.params
    let blog=await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })
})
//Adding a user to db
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
//getting all users
app.get("/users", async (req, res) => {
  let allUsers = await Users.find();
  res.json({
    success: true,
    data: allUsers
  });
});
//getting single user by id
app.get("/users/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id)
  let userExist = await Users.findOne({ _id: id }).populate("blogs")
  console.log(userExist);
  if(userExist){
    res.json({
    success: true,
    data: userExist
  });
  }
});

//DELETE BLOG
app.delete("/blogs/:blogId", isLogin, async (req, res) => {
  let { blogId } = req.params;
  let userId = req.userId; 

  let blogExists = await Blogs.findById(blogId);
  if (!blogExists) {
    return res.json({
      success: false,
      message: "Blog doesn't exist"
    });
  }

  // check ownership
  if (blogExists.userId.toString() !== userId) {
    return res.json({
      success: false,
      message: "You are not allowed to delete this blog"
    });
  }

  await Blogs.findByIdAndDelete(blogId);

  let userExist = await Users.findById(userId);
  userExist.blogs = userExist.blogs.filter((id) => id.toString() !== blogId);
  await userExist.save();

  res.json({
    success: true,
    message: "Blog deleted successfully",
    data: userExist
  });
});

//UPDATE BLOG
app.put("/blogs/:blogId", isLogin, async (req, res) => {
  let { blogId } = req.params;
  let { title, body } = req.body;
  let userId = req.userId; 

  let blogExists = await Blogs.findById(blogId);
  if (!blogExists) {
    return res.json({
      success: false,
      message: "Blog doesn't exist"
    });
  }

  // check ownership
  if (blogExists.userId.toString() !== userId) {
    return res.json({
      success: false,
      message: "You are not allowed to update this blog"
    });
  }

  let updatedBlog = await Blogs.findByIdAndUpdate(
    blogId,
    { title, body },
    { new: true } 
  );

  res.json({
    success: true,
    message: "Blog updated successfully",
    data: updatedBlog
  });
});

app.listen(3000,()=>{
    console.log("Server started");
})

mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
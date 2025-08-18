const express=require("express");
const mongoose=require("mongoose");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const blogRoute=require("./routes/blogRoutes");
app.use("/api/blogs",blogRoute);

const Blogs=require("./model/user")
const Users=require("./model/userSchema")
console.log(Blogs,Users)




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

app.listen(3000,()=>{
    console.log("Server started");
})

mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
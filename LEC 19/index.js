const express=require("express");
const mongoose=require("mongoose");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const blogsRoutes=require("./routes/blogRoutes")
app.use("/api/blogs",blogsRoutes)



const userRoutes=require("./routes/userRoutes")
app.use("/api/users",userRoutes)




app.listen(3000,()=>{
    console.log("Server started");
})

mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
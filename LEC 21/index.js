const express = require("express");
const mongoose=require("mongoose");
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
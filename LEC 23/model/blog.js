const mongoose = require('mongoose');
const user = require('./user');
const Schema = mongoose.Schema;
const BlogPost = new Schema({
  title: String,
  body: String,
  date: Date,
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
});
module.exports=mongoose.model('Blog', BlogPost);
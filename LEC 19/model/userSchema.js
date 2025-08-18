const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  username: String,
  password: String,
  blogs: [{
    type: mongoose.Types.ObjectId,
    ref: "Blog"
  }]
});
module.exports = mongoose.model('User', UserSchema);
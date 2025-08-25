const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  blog_count: { type: Number, default: 0 },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog" }],
  created_at: { type: Date, default: Date.now }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
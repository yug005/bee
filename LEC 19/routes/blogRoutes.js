const express = require("express");
const router = express.Router();
const Blogs = require("../model/blogs");
const Users = require("../model/userSchema");
const blogController = require("../controller/blogController");

router.post("/", blogController.postaddBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);

router.delete("/:blogId", async (req, res) => {
    let { blogId } = req.params;
    let { userId } = req.body;
    let blogExists = await Blogs.findById(blogId);
    if (!blogExists) return res.json({ success: false, message: "Blog doesn't exist" });
    if (blogExists.userId.toString() !== userId) return res.json({ success: false, message: "You are not allowed to delete the blog" });
    await Blogs.findByIdAndDelete(blogId);
    let userExist = await Users.findById(userId);
    userExist.blogs = userExist.blogs.filter(id => id.toString() !== blogId);
    await userExist.save();
    res.json({ success: true, message: "Blog deleted successfully", data: userExist });
});

router.put("/:blogId", async (req, res) => {
    let { blogId } = req.params;
    let { title, body, userId } = req.body;
    let blogExists = await Blogs.findById(blogId);
    if (!blogExists) return res.json({ success: false, message: "Blog doesn't exist" });
    if (blogExists.userId.toString() !== userId) return res.json({ success: false, message: "You are not allowed to update the blog" });
    let updatedBlog = await Blogs.findByIdAndUpdate(blogId, { title, body }, { new: true });
    res.json({ success: true, message: "Blog updated successfully", data: updatedBlog });
});

module.exports = router;
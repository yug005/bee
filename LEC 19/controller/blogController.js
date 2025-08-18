const Blogs = require("../model/blogs");
const Users = require("../model/userSchema");

module.exports.postaddBlog = async (req, res) => {
    let { title, body, userId } = req.body;
    let userExists = await Users.findById(userId);
    if (userExists) {
        let newBlog = new Blogs({
            title,
            body,
            date: Date.now(),
            userId
        });
        await newBlog.save();
        userExists.blogs.push(newBlog._id);
        await userExists.save();
        res.json({
            success: true,
            data: newBlog,
            message: "blog added successfully!!!"
        });
    } else {
        res.json({ success: false, message: "User not found" });
    }
};

module.exports.getAllBlogs = async (req, res) => {
    let allBlogs = await Blogs.find();
    res.json({ success: true, data: allBlogs });
};

module.exports.getBlogById = async (req, res) => {
    let { id } = req.params;
    let blog = await Blogs.findOne({ _id: id });
    res.json({ success: true, data: blog });
};
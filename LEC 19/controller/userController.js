const Users = require("../model/userSchema");

module.exports.postAddUser = async (req, res) => {
    let { email, username, password } = req.body;
    let newUser = new Users({ email, username, password });
    await newUser.save();
    res.json({
        success: true,
        data: newUser,
        message: "user added successfully!!!"
    });
};

module.exports.getAllUsers = async (req, res) => {
    let allUsers = await Users.find();
    res.json({
        success: true,
        data: allUsers
    });
};

module.exports.getUserById = async (req, res) => {
    let { id } = req.params;
    let userExist = await Users.findOne({ _id: id }).populate("blogs");
    if (userExist) {
        res.json({
            success: true,
            data: userExist
        });
    } else {
        res.json({
            success: false,
            message: "User not found"
        });
    }
};

module.exports.deleteUser = async (req, res) => {
    let { id } = req.params;
    let userExist = await Users.findById(id);
    if (!userExist) return res.json({ success: false, message: "User not found" });
    await Users.findByIdAndDelete(id);
    res.json({ success: true, message: "User deleted successfully" });
};

module.exports.updateUser = async (req, res) => {
    let { id } = req.params;
    let { email, username, password } = req.body;
    let userExist = await Users.findById(id);
    if (!userExist) return res.json({ success: false, message: "User not found" });
    let updatedUser = await Users.findByIdAndUpdate(id, { email, username, password }, { new: true });
    res.json({ success: true, message: "User updated successfully", data: updatedUser });
};
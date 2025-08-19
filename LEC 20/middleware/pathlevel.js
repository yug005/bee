function m3(req, res, next) {
    console.log("Middleware 3");
    // req.userRole = "admin";
    next();
}
function m4(req, res, next) {
    console.log("Middleware 4");
    // req.userPermissions = ["read", "write"];
    next();
}
module.exports.m3 = m3;
module.exports.m4 = m4;
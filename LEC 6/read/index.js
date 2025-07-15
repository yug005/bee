const fs = require("fs");
fs.readFile("../demo.txt", "utf-8",function(err, data) {
    if (err) {
        console.log("Error reading file:", err);
    } else {
        console.log("File content:", data);
    }
});
const fss = require("fs");
fs.readFile("../demo1.txt", "utf-8",function(err, data) {
    if (err) {
        console.log("Error reading file:", err);
    } else {
        console.log("File content:", data);
    }
});
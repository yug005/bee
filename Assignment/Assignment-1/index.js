// write data in the file using fs module input data should be taken using terminal.
const fs = require("fs");
const input= process.argv.slice(2).join(" ");
fs.writeFile("demo.txt",input,function(err) {
    if (err) {
        console.log("Error writing file:", err);
    } else {
        console.log("File written successfully");
    }
});
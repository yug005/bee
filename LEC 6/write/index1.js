const fs = require('fs');
fs.writeFile("../demo1.txt", "g26 hello , My name is yug arora", function(err){
    if (err) {
        console.log("Error writing file:", err);
    } else {
        console.log("File written successfully");
    }
})
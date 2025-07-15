const fs = require('fs');
fs.writeFile("../demo.txt", "g26 hello", function(err){
    if (err) {
        console.log("Error writing file:", err);
    } else {
        console.log("File written successfully");
    }
})
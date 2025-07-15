const fs = require("fs");
fs.readFile("../demo.txt", "utf-8",function(err, data1) {
    if (err) {
        console.log("Error reading file:", err);
    } else {
        console.log("File content:", data1);
    }


fs.readFile("../demo1.txt", "utf-8",function(err, data2) {
    if (err) {
        console.log("Error reading file:", err);
    } else {
        console.log("File content:", data2);
    }
    const fss = data1 +'/n'+ data2;
    fs.writeFile("../demo3.txt", fss, function(err) {
    if (err) {
        console.log("Error writing file:", err);
    } else {
        console.log("File written successfully");
    }
});
});
});



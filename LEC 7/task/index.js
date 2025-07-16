let users = [
    {
        name:"gaurish asija",
        age: 20,
        address: "rajpura",
    },
    {
        name:"vansh sarna",
        age: 21,
        address: "ambala",

    }
]
const fs = require('fs');
fs.writeFile("../users.txt",JSON.stringify(users,),function(err) {
    if (err) {
        console.log("Error writing file:", err);
    } else {
        console.log("File written successfully");
    }
});


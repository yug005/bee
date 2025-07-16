let users = [
    {
        name:"yug arora",
        age: 20,
        address: "delhi",
    },
    {
        name:"ritik",
        age: 21,
        address: "Chandigarh",

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
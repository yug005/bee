const fs = require("fs");
fs.readFile("../users.txt", "utf8", function(err, data) {
   if (err) {
       console.log("Error reading file:", err);
   } else {
       let users = JSON.parse(data);
       console.log(users[0]);
   }
});
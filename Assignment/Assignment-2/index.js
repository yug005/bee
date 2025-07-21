// make a to do list and user daalo to do ka tiitle discrpition the write read and with input from terminal and isko baar baar bhi daal skte hain
const fs = require("fs");
const tiitle = process.argv[2];
const description = process.argv[3];
const todoITEM = 'title: ' + tiitle + ', description: ' + description + '\n';
fs.appendFile("todo.txt", todoITEM, function(err) {
    if (err) {
        console.log("Error writing to file:", err);
    } else {
        console.log("To-do added");
        
    }
});
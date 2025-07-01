const fs = require("fs");

console.log("start");

setTimeout(() => {
    console.log("timer callback");
}, 0);

setImmediate(() => {
    console.log("immediate callback");
});

fs.readFile("demo.txt", (err, data) => {
    console.log("poll phase callback");
    setTimeout(() => {
        console.log("timer 2");
    }, 0);
    setImmediate(() => {
        console.log("immediate 2");
    });
});

console.log("end");

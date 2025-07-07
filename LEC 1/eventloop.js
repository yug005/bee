const fs = require("fs");
const { resolve } = require("path");

console.log("start");

setTimeout(() => {
    console.log("timer callback");
}, 0);

setImmediate(() => {
    console.log("immediate callback");
});
function dosometask(){
    return new Promise((resolve,reject)=>{
        resolve("promise")
    })
}

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

dosometask().then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err)
});
process.nextTick(()=>{
    console.log("next tick")
})

let p=new Promise((resolve, reject) => {
    resolve("waada pura kiya");
})
// console.log(p);
p.then((data)=> {
    console.log(data);
})
.catch((err) => {
    console.log(err);
})
    

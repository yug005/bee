let users =[
    {
    id:1,
    name:"nitesh",
    age:24,
},


{
    id:2,
    name:"Ritik",
    age:16
}
]
function isAllowed(id){
    return new Promise((resolve, reject) => {
        let user = users.find(user => user.id === id);
        if (!user) {
            reject("User not found");
        }
        else if (user.age >= 18) {
            resolve("Access granted to: " + user.name);
        }
        else {
            resolve("User found:");
        }
    });
}
isAllowed(2)
    .then((message) => {
        console.log(message);
    }).catch((error) => {
        console.error(error);
    });

isAllowed(5)
    .then((message) => {
        console.log(message);
    }).catch((error) => {
        console.error(error);
    });
isAllowed(1)
    .then((message) => {
        console.log(message);
    }).catch((error) => {
        console.error(error);
    });
    

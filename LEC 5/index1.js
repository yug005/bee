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

function isAllowed(id) {
    let user = users.find(user => user.id === id);
    
    if (!user) {
        console.log("User not found");
    } else if (user.age >= 18) {
        console.log("Access granted to:", user.name);
    } else {
        console.log("Access denied to:", user.name, "age is less");
    }
}

isAllowed(1); 
isAllowed(2); 
isAllowed(3); 

console.log("End of program");



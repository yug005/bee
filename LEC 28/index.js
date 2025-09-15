const {PrismaClient} = require('./generated/prisma');
const prisma = new PrismaClient();
async function addUser(email , name , password) {


await prisma.user.create({
    data:{
        email:email,
        name:name,
        password:password
    }
})

}
// addUser("arora@gmail.com","arora","1234")
// .then(()=>{
//     console.log("user added successfully!")
// })
async function getAllUser(){
    let allUser = await prisma.user.findMany();
    return allUser;
}
getAllUser()
.then((data)=>{
    console.log(data)
})

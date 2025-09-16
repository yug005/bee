const {PrismaClient} = require('./generated/prisma');
const prisma = new PrismaClient();

// Create: Adds a new user
async function addUser(email , name , password) {
    let newUser = await prisma.user.create({
        data:{
            email: email,
            name: name,
            password: password
        }
    });
    return newUser;
}
// addUser("yug arora","yuggg@gmail.com","123456").then((data)=>{
//     console.log("user added successfully");
// }).catch((err)=>{
//     console.log(err.message);
// });
async function addTweet(content, userId) {
    return await prisma.tweet.create({
        data: {
            content: content,
            userId: userId
        }
    });
} 
// addTweet("This is my first tweet", 1).then((data)=>{
//     console.log("Tweet added successfully");
// }).catch((err)=>{
//     console.log(err.message);
// });  
//find all tweets of a user whos id is 1
async function getTweetsByUserId(userId) {
    let tweets = await prisma.tweet.findMany({
        where: {
            userId: userId
        }
    });
    return tweets;
}
// getTweetsByUserId(1).then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err.message);
// });

//user who's id is 1 wants to update his tweet whoose id is 1;
async function updateTweet(tweetId,userId,updatedContent){
   let tweet = await prisma.tweet.findUnique({
      where: {
         id: Number(tweetId)
      }
   });
   if(!tweet){
      return "Tweet not found";
   }
   if(tweet.userId != Number(userId)){
      return "user can not update";
   }
   await prisma.tweet.update({
      where:{
         id:Number(tweetId)
      },
      data:{ 
         content:updatedContent
      }
   });
}
// updateTweet("1","1","Updated tweet content")
// .then(()=>{
//    console.log("Tweet updated");
// });
//delete
async function deleteTweet(tweetId, userId) {
  try {
    const deletedTweet = await prisma.tweet.deleteMany({
      where: {
        id: tweetId,
        userId: userId, 
      },
    });

    if (deletedTweet.count === 0) {
      console.log('No tweet was deleted. It might not exist or you are not the owner.');
    } else {
      console.log(`Successfully deleted ${deletedTweet.count} tweet(s).`);
    }

    return deletedTweet;
  } catch (error) {
    console.error('Error deleting tweet:', error);
    throw error;
  }
}


deleteTweet(1, 1)
  .then(() => {
    console.log('Delete operation completed.');
  })
  .catch((err) => {
    console.log(err.message);
  });
    
    


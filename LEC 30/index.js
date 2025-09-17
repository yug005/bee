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
// addTweet("This is my second tweet", 1).then((data)=>{
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
    console.log(`Fetched tweets for userId ${userId}:`, tweets);
    return tweets;
}
// getTweetsByUserId(1).then((data)=>{
//     console.log('All tweets for user 1:', data);
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
//delete tweet
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


// deleteTweet(2, 1)
//   .then(() => {
//     console.log('Delete operation completed.');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
    
    
async function deleteUserAndTweets(userId) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      }
    });
    // Optionally, delete tweets by user
    await prisma.tweet.deleteMany({
      where: {
        userId: userId
      }
    });
    console.log(`Deleted user ${userId} and their tweets.`);
  } catch (error) {
    console.error('Error deleting user and tweets:', error);
    throw error;
  }
}
// deleteUserAndTweets(1)
//   .then(() => {
//     console.log('User and their tweets deleted successfully.');
//   })
//   .catch((err) => {
//     console.error('Failed to delete user and tweets:', err.message);
//   });

//get users



async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log('Found users:', users);
    
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
}

//  caling gett users all

// getAllUsers()
//   .then((users) => {
//     console.log('User retrieval completed');
    
//   })
//   .catch((err) => {
//     console.error('Failed to retrieve users:', err.message);
//   });


  // all suers with email and name only
async function getAllUserEmailsAndNames() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true
      }
    });
    console.log('User emails and names', users);
    return users;
  } catch (error) {
    console.error('Error fetching user emails and names', error);
    throw error;
  }
}

// caling 
// getAllUserEmailsAndNames()
//   .then((users) => {
//     console.log('Selected user emails and names', users);
//   })
//   .catch((err) => {
//     console.error('Failed to retrieve user emails and names', err.message);
//   });
  // New function: get all users with their tweets' title

async function getAllUsersWithTweetsTitle() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        tweets: {
          select: {
            content: true
          }
        }
      }
    });
    console.log('Users with tweets title:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users with tweets title', error);
    throw error;
  }
}
// calling
getAllUsersWithTweetsTitle()
  .then((users) => {
    console.log('Selected users with tweets title', users);
  })
  .catch((err) => {
    console.error('Failed to retrieve users with tweets title', err.message);
  });

// addUser("yug arora","yuggg@gmail.com","123456").then((data)=>{
//     console.log("user added successfully");
// }).catch((err)=>{
//     console.log(err.message);
// });
// addUser("gaurish","gaurish@gmail.com","123456").then((data)=>{
//     console.log("user added successfully");
// }).catch((err)=>{
//     console.log(err.message);
// });
// addUser("rahul","rahul@gmail.com","123456").then((data)=>{
//     console.log("user added successfully");
// }).catch((err)=>{
//     console.log(err.message);
// });
// addUser("ram","ram@gmail.com","123456").then((data)=>{
//     console.log("user added successfully");
// }).catch((err)=>{
//     console.log(err.message);
// });

// Sequentially add 2 tweets for each user (IDs 2-5)
// addTweet("First tweet for user 2", 2).then(() => {
//   console.log("Added first tweet for user 2");
//   return addTweet("Second tweet for user 2", 2);
// }).then(() => {
//   console.log("Added second tweet for user 2");
//   return addTweet("First tweet for user 3", 3);
// }).then(() => {
//   console.log("Added first tweet for user 3");
//   return addTweet("Second tweet for user 3", 3);
// }).then(() => {
//   console.log("Added second tweet for user 3");
//   return addTweet("First tweet for user 4", 4);
// }).then(() => {
//   console.log("Added first tweet for user 4");
//   return addTweet("Second tweet for user 4", 4);
// }).then(() => {
//   console.log("Added second tweet for user 4");
//   return addTweet("First tweet for user 5", 5);
// }).then(() => {
//   console.log("Added first tweet for user 5");
//   return addTweet("Second tweet for user 5", 5);
// }).then(() => {
//   console.log("Added second tweet for user 5");
// }).catch((err) => {
//   console.error("Error adding tweet:", err.message);
// });



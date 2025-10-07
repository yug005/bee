const {PrismaClient} = require('./generated/prisma');
const prisma = new PrismaClient();

// Create: Adds a new user
async function addUser(email , name , password) {
    await prisma.user.create({
        data:{
            email: email,
            name: name,
            password: password
        }
    });
    console.log("User added successfully!");
}

// Read: Gets all users
async function getAllUser(){
    let allUser = await prisma.user.findMany();
    return allUser;
}

// Read: Gets a single user by their ID
async function getUserById(userId) {
    let user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    return user;
}

// Update: Updates a user's name by their ID
async function updateUser(userId, newName) {
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name: newName,
        },
    });
    console.log("User updated successfully!");
}

// Delete: Deletes a user by their ID
async function deleteUser(userId) {
    await prisma.user.delete({
        where: {
            id: userId,
        },
    });
    console.log("User deleted successfully!");
}

// Example usage to demonstrate all functions
async function main() {
    try {
        // Create a new user
        await addUser("test@example.com", "Test User", "securepassword");

        // Read all users
        const allUsers = await getAllUser();
        console.log("All users:", allUsers);

        // Assuming the user you just created has an ID, let's find it.
        // In a real app, you'd get the ID from the addUser result.
        const createdUser = allUsers.find(u => u.email === "test@example.com");
        if (createdUser) {
            // Read a single user
            const singleUser = await getUserById(createdUser.id);
            console.log("Found user by ID:", singleUser);

            // Update the user's name
            await updateUser(createdUser.id, "Updated Name");

            // Delete the user
            await deleteUser(createdUser.id);
            
            // Re-read all users to confirm deletion
            const usersAfterDeletion = await getAllUser();
            console.log("All users after deletion:", usersAfterDeletion);
        }

    } catch (e) {
        console.error("An error occurred:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
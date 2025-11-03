let {createClient}=require("redis");
let client = createClient();


async function notify(){
    await client.SUBSCRIBE("notifications",(message) => {
        console.log("Received notification:", JSON.parse(message));
    })

}
setTimeout(() => {
    notify();
}, 2000);




client.connect()
.then(() => {
    console.log("Redis client connected");
}).catch((err) => {
    console.error("Redis connection error:", err);
});

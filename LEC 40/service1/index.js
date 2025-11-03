let {createClient}=require("redis");
let client = createClient();


async function notify(){
    await client.PUBLISH("notifications",JSON.stringify({
        id:1,message:"iphone back in stock"
    }));

}
setTimeout(() => {
    notify();
}

, 2000);



client.connect()
.then(() => {
    console.log("Redis client connected");
}).catch((err) => {
    console.error("Redis connection error:", err);
});

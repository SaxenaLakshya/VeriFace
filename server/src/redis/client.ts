import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});

redisClient.on("ready", () => {
    console.log("Redis is ready");
});

redisClient.on("error", (err: Error) => {
    console.error("Redis Error:", err);
});

redisClient.on("reconnecting", () => {
    console.log("Reconnecting to Redis...");
});

redisClient.on("end", () => {
    console.log("Redis connection closed");
});

export default redisClient;
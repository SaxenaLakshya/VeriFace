import dotenv from "dotenv";
dotenv.config();

import app from "./server";
import redisClient from "./redis/client";

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
    try {
        console.log("Connecting to Redis...");
        await redisClient.connect();
        console.log("Redis Connected Successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    } catch (error) {
        console.error("Failed to connect to Redis");
        console.error(error);
        process.exit(1);
    }
}

startServer();
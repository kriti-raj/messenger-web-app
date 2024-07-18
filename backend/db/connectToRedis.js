import { createClient } from 'redis';

const connectToRedis = async () => {
    try {
        const client = createClient({
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        });

        await client.connect(); // Connect to the Redis client
        console.log("Connected to Redis");

        return client; // Return the connected client
    } catch (error) {
        console.log("Error connecting to Redis:", error.message);
        throw error; // Rethrow the error to handle it in the server startup
    }
}

export default connectToRedis;

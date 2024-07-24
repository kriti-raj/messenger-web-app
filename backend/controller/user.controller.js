import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const client = req.app.locals.redisClient; // Get the Redis client from app locals

        if (!client) {
            console.log("Redis client is not initialized");
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Check if data is already cached in Redis
        const cacheKey = `usersForSidebar:${loggedInUserId}`;
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            // console.log('Data from redis');
            return res.status(200).json(JSON.parse(cachedData)); // Parse cached data before sending response
        }

        // Fetch users from MongoDB excluding the logged-in user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // Store data in Redis with an expiration time
        await client.set(cacheKey, JSON.stringify(filteredUsers), {
            EX: 300 // Set key with an expiration of 5 minutes
        });

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

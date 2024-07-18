// Imports 
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import connectToRedis from "./db/connectToRedis.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();

// PORT should be assigned after calling dotenv.config()
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Function to start the server
const startServer = async () => {
    try {
        await connectToMongoDB(); // Connect to MongoDB
        const redisClient = await connectToRedis(); // Connect to Redis

        app.locals.redisClient = redisClient; // Store the Redis client in app locals for later use

        server.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
    }
};

startServer();

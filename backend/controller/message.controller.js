import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save conversation and message in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const client = req.app.locals.redisClient; // Get the Redis client from app locals

        if (!client) {
            console.log("Redis client is not initialized");
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Check if data is already cached in Redis
        const cacheKey = `conversation:${senderId}:${userToChatId}`;
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            // console.log('Data from redis');
            return res.status(200).json(JSON.parse(cachedData)); // Parse cached data before sending response
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        // Store data in Redis with an expiration time
        await client.set(cacheKey, JSON.stringify(messages), {
<<<<<<< HEAD
            EX: 300 // Set key with an expiration of 1 hour
=======
            EX: 300 // Set key with an expiration of 5 minutes
>>>>>>> 7d57c004367740ad9741dac835e9a3806b499a75
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

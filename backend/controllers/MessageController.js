import Message from "../models/Messages.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Items from "../models/AddItem.js";

export const getMessages = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name")
.populate("receiver", "name")
.populate("item", "itemName image"); 

    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(ownerId) },
            { receiver: new mongoose.Types.ObjectId(ownerId) },
          ],
        },
      },

      {
        $sort: { createdAt: -1 }, // latest first
      },

      {
        $group: {
          _id: {
            user: {
              $cond: [
                { $eq: ["$sender", new mongoose.Types.ObjectId(ownerId)] },
                "$receiver",
                "$sender",
              ],
            },
          },
          lastMessage: { $first: "$text" },
          item: { $first: "$item" }, // optional
          createdAt: { $first: "$createdAt" },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id.user",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: "$user",
      },

      {
        $project: {
          _id: 0,
          user: { name: "$user.name", _id: "$user._id" },
          lastMessage: 1,
          createdAt: 1,
          item: 1, // optional if you need
        },
      },
    ]);

    res.json({ success: true, conversations });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Items" },
  text: String,
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
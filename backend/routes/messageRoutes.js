import express from "express";
import { getMessages,getConversations } from "../controllers/MessageController.js";

const router = express.Router();
router.get("/conversations/:ownerId", getConversations);
router.get("/:userId/:otherUserId", getMessages);        


export default router;
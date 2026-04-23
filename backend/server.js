import express from 'express';
import "dotenv/config";
import cors from "cors";
import http from "http"
import { Server } from 'socket.io';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import Message from './models/Messages.js';
import messageRoutes from './routes/messageRoutes.js'
import routeRouter from "./routes/route.js";
import supportRoutes from "./routes/supportRoutes.js"

const app=express()
await connectDB()

app.use(cors())
app.use(express.json())
app.use("/api/messages", messageRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers.set(userId.toString(), socket.id);
    console.log("Online Users:", onlineUsers);
  });
  socket.on("sendMessage", async (data) => {
  try {
    const { sender, receiver, text, item } = data;

    const message = await Message.create({
      sender,
      receiver,
      text,
      item,
    });
    console.log("Online Users:", onlineUsers);

    const receiverSocket = onlineUsers.get(receiver.toString());

if (receiverSocket) {
  io.to(receiverSocket).emit("receiveMessage", message);
}

socket.emit("receiveMessage", message);

  } catch (error) {
    console.log("Message error:", error.message);
  }
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (let [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});



app.get('/',(req,res)=> res.send("Server is running"))
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/nitems', itemRoutes);
app.use('/api/booking',bookingRouter)
app.use("/api/route", routeRouter);
app.use("/api/support", supportRoutes)

const PORT = process.env.PORT || 3000
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
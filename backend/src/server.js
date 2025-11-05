import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import vitalsRoutes from "./routes/vitals.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vitals", vitalsRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);
  socket.on("joinRoom", ({ room }) => socket.join(room));
  socket.on("chatMessage", (msg) => io.to(msg.room).emit("chatMessage", msg));
});

// Health
app.get("/", (req,res)=> res.send("Smart Hospital API ✅"));

// Start
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));

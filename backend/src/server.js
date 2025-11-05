require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const vitalsRoutes = require('./routes/vitals');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/vitals', vitalsRoutes);

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('joinRoom', ({room}) => socket.join(room));
  socket.on('chatMessage', (msg) => io.to(msg.room).emit('chatMessage', msg));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));

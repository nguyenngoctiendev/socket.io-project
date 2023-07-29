const express = require("express");
const ejs = require("ejs");
const cors = require("cors");
const session = require("express-session");
const db = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const viewRoutes = require("./routes/viewsRoutes");
const dotenv = require("dotenv").config();
const app = express();

db.dbConnect();

app.use(session({ secret: process.env.session, resave: false, saveUninitialized: true, cookie: { maxAge: 2592000000 } }));
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", viewRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/running", (req, res) => {
  res.send("api running");
});

const port = process.env.PORT || 3000; // Set a default port number
const server = app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

const socket = require("socket.io");
const io = socket(server);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("setup", (data) => {
    socket.join(data._id);
    socket.emit("connected");
  });

  socket.on("join-chat", (chatRoomId) => {
    socket.join(chatRoomId);
    console.log("User joined room " + chatRoomId);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop-typing", (room) => {
    socket.in(room).emit("stop-typing");
  });

  socket.on("newMessage", (message) => {
    const receiveMessage = message.chat;
    if (!receiveMessage.user) {
      console.log("User is not defined");
    }
    receiveMessage.users.forEach((user) => {
      if (user._id == message.sender._id) {
        return;
      }
      socket.in(user._id).emit("message-received");
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const path = require("path");
const mongoose = require("mongoose");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { encrypt, decrypt } = require("./utils/cryptography.js");
const Cryptr = require("cryptr");
const Room = require("./RoomSchema");
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
const cryptr = new Cryptr(
  "56dce7276d2b0a24e032beedf0473d743dbacf92aafe898e5a0f8d9898c9eae80a73798beed53489e8dbfd94191c1f28dc58cad12321d8150b93a2e092a744265fd214d7c2ef079e2f01b6d06319b7b2"
);

mongoose.connect("mongodb://localhost/chat_db");

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Setting static folder
app.use(express.static(path.join(__dirname, "public")));
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
const botName = "Admin";

app.post('/create-room', async (req, res) => {
  try {
    const { roomName, password, username } = req.body;
    
    // Check if room already exists
    const existingRoom = await Room.findOne({ name: roomName });
    if (existingRoom) {
      return res.status(400).json({ success: false, message: 'Room already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new room
    const room = new Room({
      name: roomName,
      password: hashedPassword,
      secretKey: hashedPassword // Keep secretKey for compatibility
    });
    
    await room.save();

    // Redirect to chat room after creation
    const url = `chat.html?room=${roomName}&username=${username}&sk=${room._id}`;
    res.redirect(url);
  } catch (error) {
    console.error('Room creation error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post('/join-room', async (req, res) => {
  try {
    const { roomName, password } = req.body;
    const room = await Room.findOne({ name: roomName });
    
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, room.secretKey);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }
    
    res.json({ success: true, message: 'Room joined successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post("/validate", async (req, res) => {
  try {
    const username = req.body.username;
    const roomName = req.body.room;
    const key = req.body.key;

    const room = await Room.findOne({ name: roomName });
    
    if (!room) {
      console.log('Room not found:', roomName);
      return res.redirect("wrong-password.html");
    }

    const isPasswordValid = await bcrypt.compare(key, room.password);
    if (!isPasswordValid) {
      console.log('Invalid password for room:', roomName);
      return res.redirect("wrong-password.html");
    }

    // If password is valid, redirect to chat room
    const url = `chat.html?room=${roomName}&username=${username}&sk=${room._id}`;
    console.log('Joining room:', url);
    res.redirect(url);
  } catch (error) {
    console.error('Join room error:', error);
    res.redirect("wrong-password.html");
  }
});

app.post('/your-endpoint', (req, res) => {
  // Some logic here
  if (someCondition) {
    res.redirect('/some-url');
  } else {
    res.send('Some response');
  }
});

//RUn when client connects

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    //Welcome current user
    socket.emit(
      "message",
      formatMessage(botName, cryptr.encrypt("Welcome To Chatbox"))
    );

    //When user enters a chat room
    //Broadcast will show the prompt to all folks in chat room other than user itself
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(
          botName,
          cryptr.encrypt(`${user.username} has entered the chat room`)
        )
      );

    //Send room and users info

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    //console.log(msg);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  //When user disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      //io.emit will show the prompt to all folks in chat room including the user itself
      io.to(user.room).emit(
        "message",
        formatMessage(
          botName,
          cryptr.encrypt(`${user.username} has left the chat`)
        )
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

// ROUTES

app.get("/decrypt", (req, res) => {
  message = req.query.message;
  console.log("LD: " + message.length);
  decrypted = cryptr.decrypt(message);
  res.json(decrypted);
});

app.get("/encrypt", (req, res) => {
  message = req.query.message;
  encrypted = cryptr.encrypt(message);
  console.log("LE: " + encrypted.length);
  res.json(encrypted);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

# End-To-End Encrypted Secure Chat Application 🔒

A real-time chat application with end-to-end encryption, secure room access, and MongoDB integration. Built with Node.js, Socket.io, and modern web technologies.

## 🌟 Features

- **End-to-End Encryption**: All messages are encrypted using strong cryptographic algorithms
- **Private Chat Rooms**: Create and join password-protected chat rooms
- **Real-time Communication**: Instant message delivery using Socket.io
- **Secure Authentication**: Passwords are hashed using bcrypt
- **Modern UI**: Clean and responsive user interface
- **MongoDB Integration**: Persistent storage of chat rooms and messages

## 🛠️ Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - Socket.io
  - MongoDB
  - Mongoose
  - Bcrypt

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript
  - Socket.io Client
  - Font Awesome Icons

- **Security**:
  - End-to-End Encryption
  - Password Hashing
  - Secure Room Access

## 📋 Prerequisites

Before running the application, make sure you have:

1. Node.js (v12 or higher)
2. MongoDB (v4 or higher)
3. npm (Node Package Manager)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/end-to-end-encrypted-chat.git
   cd end-to-end-encrypted-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB:
   ```bash
   mongod --dbpath ~/data/db
   ```

4. Start the application:
   ```bash
   node server.js
   ```

5. Access the application:
   - Open `http://localhost:3000` in your web browser

## 💻 Usage Guide

### Creating a New Chat Room

1. Open `http://localhost:3000`
2. Click the "Create Room" tab
3. Fill in:
   - Username (your display name)
   - Room Name (unique name for your chat room)
   - Room Password (password to protect the room)
4. Click "Create Room"
5. You'll be automatically redirected to the chat room

### Joining an Existing Room

1. Open `http://localhost:3000`
2. Stay on the "Join Room" tab
3. Enter:
   - Your username
   - Exact room name
   - Room password
4. Click "Join Chat"
5. If credentials are correct, you'll join the chat room

## 🔒 Security Features

1. **End-to-End Encryption**:
   - Messages are encrypted before transmission
   - Only participants in the room can decrypt messages
   - Uses strong encryption algorithms

2. **Password Security**:
   - Passwords are hashed using bcrypt
   - Original passwords are never stored
   - Secure password comparison

3. **Room Security**:
   - Password-protected rooms
   - Unique room names
   - Secure room access validation

## 🚦 Error Handling

- **Room Creation**:
  - Prevents duplicate room names
  - Validates required fields
  - Handles creation errors gracefully

- **Room Joining**:
  - Validates room existence
  - Verifies password correctness
  - Shows clear error messages

## 💡 Best Practices

1. **For Room Creators**:
   - Use strong, unique passwords
   - Share room credentials securely
   - Don't reuse passwords

2. **For Room Participants**:
   - Keep room passwords confidential
   - Don't share sensitive information
   - Log out when done

## 🛠️ Troubleshooting

1. **Can't Connect to Server**:
   - Verify MongoDB is running
   - Check if port 3000 is available
   - Ensure all dependencies are installed

2. **Room Access Issues**:
   - Verify room name exactly
   - Check password correctness
   - Ensure MongoDB connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Contact

For questions or support, please contact [your-email@example.com]

## 🙏 Acknowledgments

- Socket.io team for real-time capabilities
- MongoDB team for database functionality
- Open source community for various packages used
# End-To-End-Encrypted-SecureChatting-Application

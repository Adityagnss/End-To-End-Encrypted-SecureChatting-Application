const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  secretKey: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Room", RoomSchema);

// "cybersec12345"
// "algo12345"
// "ds12345"
// "os12345"
//"ai12345"
// "se12345"

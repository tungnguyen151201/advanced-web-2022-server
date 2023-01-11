const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
  presentation: { type: mongoose.ObjectId, required: true },
  users: [{ type: mongoose.ObjectId }],
  messages: [
    {
      user: mongoose.ObjectId,
      message: String,
      createAt: { type: Date, default: Date.now() },
    },
  ],
});

const room = mongoose.model('Room', roomSchema);

module.exports = room;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: { type: String },
  username: { type: String, require: true },
  email: { type: String, require: true },
  emailToken: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
  status: { type: String, enum: ['Active', 'Pending', 'Deactivated'] },
});
const user = mongoose.model('User', userSchema);
module.exports = user;

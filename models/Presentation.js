const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PresentationSchema = new Schema({
  name: { type: String, require: true },
  owner: { type: mongoose.ObjectId, require: true, ref: 'User' },
  coowners: [{ type: mongoose.ObjectId, ref: 'User' }],
  slides: [
    {
      question: { type: String, require: true },
      options: [{ type: String, require: true }],
      answers: [
        {
          user: { type: mongoose.ObjectId, ref: 'User' },
          answer: { type: String },
        },
      ],
      createdAt: { type: Date, default: Date.now() },
    },
  ],
  questions: [
    {
      user: { type: mongoose.ObjectId, ref: 'User' },
      content: { type: String, require: true },
      isReplied: { type: Boolean, default: false },
      vote: { type: Number, default: 0 },
      createdAt: { type: Date, default: Date.now() },
    },
  ],
  status: { type: Boolean },
  createdAt: { type: Date, default: Date.now() },
});
const Presentation = mongoose.model('Presentation', PresentationSchema);
module.exports = Presentation;

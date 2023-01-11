const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SlideSchema = new Schema({
  question: { type: String, require: true },
  options: [{ type: String, require: true }],
  createdAt: { type: Date, default: Date.now() },
});
const Slides = mongoose.model('Slide', SlideSchema);
module.exports = Slides;

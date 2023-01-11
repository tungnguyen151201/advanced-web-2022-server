const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  groupname: { type: String, require: true },
  url: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  owner: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
  coowner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  presentation: { type: Schema.Types.ObjectId, ref: 'Presentation' },
  createdAt: { type: Date, default: Date.now() },
});
const Groups = mongoose.model('Group', GroupSchema);
module.exports = Groups;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  message: {type: String, required: true},
  date: { type: Date, required: true },
  user: { type: Schema.ObjectId, ref: 'User', require: true },
  bookInfo: { type: Schema.ObjectId, ref: 'BookInfo', require: true },
  removed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Comment', CommentSchema);
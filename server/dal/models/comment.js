var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate');


var CommentSchema = new Schema({
  message: {type: String, required: true},
  date: { type: Date, required: true },
  user: { type: Schema.ObjectId, ref: 'User', require: true },
  userName: { type: String, require: true },
  book: { type: Schema.ObjectId, ref: 'Book', require: true },
  removed: { type: Boolean, default: false }
});

CommentSchema.plugin(paginate);

module.exports = mongoose.model('Comment', CommentSchema);
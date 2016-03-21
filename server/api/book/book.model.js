var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  bookInfo: { type: Schema.ObjectId, ref: 'BookInfo', required: true }
});

module.exports = mongoose.model('Book', BookSchema);
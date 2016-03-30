var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  status: { type: Number, required: true },
  date: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  user: { type: Schema.ObjectId, ref: 'User', require: true },
  book: { type: Schema.ObjectId, ref: 'Book', require: true }
});

module.exports = mongoose.model('Order', OrderSchema);
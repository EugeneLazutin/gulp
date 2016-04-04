var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate');

var OrderSchema = new Schema({
  status: { type: Number, required: true },
  date: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  user: { type: Schema.ObjectId, ref: 'User', require: true },
  userName: { type: String, require: true },
  book: { type: Schema.ObjectId, ref: 'Book', require: true },
  bookTitle: { type: String, require: true }
});

OrderSchema.plugin(paginate);

module.exports = mongoose.model('Order', OrderSchema);
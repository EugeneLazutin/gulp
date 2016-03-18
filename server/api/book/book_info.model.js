var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Book = require('./book.model');
var Transaction = require('mongoose-transaction')(mongoose);

var currYear = new Date().getFullYear();

var BookInfoSchema = new Schema({
  title: {type: String, required: true},
  picture: {type: String},
  author: {type: String, required: true, default: 'not specified'},
  year: {type: Number, required: true, max: currYear},
  pages: {type: Number, required: true, min: 1},
  count: {type: Number, default: 1, min: 1}
});

BookInfoSchema
  .post('save', function (doc) {
    var trans = new Transaction();
    for(var i = 0; i < doc.count; i++) {
      trans.insert('Book', { bookInfo: doc._id });
    }
    trans.run(function (err) {
      if(err) {
        this.remove(function (){
          throw err;
        });
      }
    });
  });

BookInfoSchema.methods = {};

module.exports = mongoose.model('BookInfo', BookInfoSchema);


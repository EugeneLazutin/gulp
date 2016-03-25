var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Book = require('./book.model');
var Transaction = require('mongoose-transaction')(mongoose);
var _ = require('lodash');
var paginate = require('mongoose-paginate');

var currYear = new Date().getFullYear();

var BookInfoSchema = new Schema({
  title: {type: String, required: true},
  picture: {type: String},
  author: {type: String, required: true, default: 'not specified'},
  description: {type: String, required: true},
  year: {type: Number, required: true, max: currYear},
  pages: {type: Number, required: true, min: 1},
  count: {type: Number, default: 1, min: 1}
});

BookInfoSchema.plugin(paginate);

BookInfoSchema
  .post('save', function (doc) {
    var trans = new Transaction();
    for (var i = 0; i < doc.count; i++) {
      trans.insert('Book', {bookInfo: doc._id});
    }
    trans.run(function (err, docs) {
      if (err) {
        this.remove(function () {
          throw err;
        });
      }
    });
  });

BookInfoSchema.methods = {
  addBooks(count) {
    if (count && _.isNumber(count)) {
      var trans = new Transaction();
      for (var i = 0; i < count; i++) {
        trans.insert('Book', {bookInfo: this._id});
      }
      trans.run(function (err, docs) {
        throw err;
      });
    } else {
      throw new Error('count should be a number');
    }
  },
  available() {
    return new Promise((resolve, reject) => {
      Book.count({bookInfo: this._id}, (err, count) => {
        if(err) {
          reject(err);
        }
        resolve(count);
      });
    });
  }
};

module.exports = mongoose.model('BookInfo', BookInfoSchema);


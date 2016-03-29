var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
  count: {type: Number, default: 1, min: 1},
  available: {type: Number, default: 1, min: 0},
  comments: [{type: Schema.ObjectId, ref: 'Comment'}]
});

BookInfoSchema.plugin(paginate);

BookInfoSchema.methods = {
  addBooks(count) {
    if (count && _.isNumber(count)) {
      this.count += count;
      this.available += count;
      this.save(function (err) {
        if(err) {
          throw err;
        }
      });
    } else {
      throw new Error('count should be a number');
    }
  }
};

module.exports = mongoose.model('BookInfo', BookInfoSchema);


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var paginate = require('mongoose-paginate');

var currYear = new Date().getFullYear();

var BookSchema = new Schema({
  title: {type: String, required: true},
  picture: {type: String},
  author: {type: String, required: true, default: 'not specified'},
  description: {type: String, required: true},
  year: {type: Number, required: true, max: currYear},
  pages: {type: Number, required: true, min: 1},
  count: {type: Number, default: 1, min: 1},
  available: {type: Number, default: 1, min: 0}
});

BookSchema.plugin(paginate);

module.exports = mongoose.model('Book', BookSchema);


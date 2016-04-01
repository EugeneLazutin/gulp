var numberFilter = require('./number_filter');
var stringFilter = require('./string_filter');
var enumFilter = require('./enum_filter');
var boolFilter = require('./bool_filter');

var templatesFactory = {
  number: numberFilter,
  string: stringFilter,
  enum: enumFilter,
  bool: boolFilter
};

module.exports = templatesFactory;
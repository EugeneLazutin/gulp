var numberFilter = require('./number_filter');
var stringFilter = require('./string_filter');

var templatesFactory = {
  number: numberFilter,
  string: stringFilter
};

module.exports = templatesFactory;
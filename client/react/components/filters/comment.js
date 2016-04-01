var templateFactory = require('./templates');
var createFilter = require('./filter').createFilter;


var RemovedFilter = createFilter('removed', 'Removed', templateFactory.enum, [
  {
    key: 'Removed',
    value: true
  },
  {
    key: 'Active',
    value: false
  }
]);

module.exports = [RemovedFilter];
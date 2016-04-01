var templateFactory = require('./templates');
var createFilter = require('./filter').createFilter;


var BlockedFilter = createFilter('blocked', 'Blocked', templateFactory.enum, [
  {
    key: 'Blocked',
    value: true
  },
  {
    key: 'Active',
    value: false
  }
]);

module.exports = [BlockedFilter ];
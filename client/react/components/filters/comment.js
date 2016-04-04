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
var MessageFilter = createFilter('message', 'Message', templateFactory.string);
var UserNameFilter = createFilter('userName', 'User', templateFactory.string);

module.exports = [RemovedFilter, MessageFilter, UserNameFilter];
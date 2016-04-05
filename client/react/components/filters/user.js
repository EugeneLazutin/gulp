var templateFactory = require('./templates');
var createFilter = require('./filter').createFilter;
var roles = require('../../../../config').roles;


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
var EmailFilter = createFilter('email', 'Email', templateFactory.string);
var RoleFilter = createFilter('role', 'Role', templateFactory.enum, [
  {
    key: 'Admin',
    value: roles.admin
  },
  {
    key: 'User',
    value: roles.user
  }
]);


module.exports = [BlockedFilter, EmailFilter, RoleFilter];
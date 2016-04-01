var Users = require('../components/user/users.admin');
var limit = require('../../../config/client/pagination').limit;
var userFilters = require('../components/filters/user');
var createListPage = require('./list.factory');

var OrderPage = createListPage(Users, userFilters, limit.lg, '/api/user/all');

module.exports = OrderPage;

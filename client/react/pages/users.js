var Users = require('../components/user/users.admin');
var limit = require('../../../config/client/pagination').limit;
var userFilters = require('../components/filters/user');
var createListPage = require('./list.factory');
var apis = require('../../../config/client').apis;

var OrderPage = createListPage(Users, userFilters, limit.lg, apis.userAll);

module.exports = OrderPage;

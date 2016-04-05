var Users = require('../../components/user/users.admin.js');
var limit = require('../../../../config/client/pagination').limit;
var userFilters = require('../../components/filters/user');
var createListPage = require('./../list.factory.js');
var apis = require('../../../../config/client/index').apis;

var OrderPage = createListPage(Users, userFilters, limit.lg, apis.userAll);

module.exports = OrderPage;

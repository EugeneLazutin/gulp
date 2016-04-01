var Orders = require('../components/order/orders.admin');
var limit = require('../../../config/client/pagination').limit;
var orderFilters = require('../components/filters/order');
var createListPage = require('./list.factory');

var OrderPage = createListPage(Orders, orderFilters, limit.lg, '/api/order/all');

module.exports = OrderPage;

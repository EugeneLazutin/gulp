var Orders = require('../components/order/orders.admin');
var limit = require('../../../config/client/pagination').limit;
var orderFilters = require('../components/filters/order');
var createListPage = require('./list.factory');
var apis = require('../../../config/client').apis;

var OrderPage = createListPage(Orders, orderFilters, limit.lg, apis.orderAll);

module.exports = OrderPage;

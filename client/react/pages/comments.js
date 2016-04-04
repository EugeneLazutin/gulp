var Comments = require('../components/comment/comments.admin');
var limit = require('../../../config/client/pagination').limit;
var commentFilters = require('../components/filters/comment');
var createListPage = require('./list.factory');
var apis = require('../../../config/client').apis;

var CommentPage = createListPage(Comments, commentFilters, limit.lg, apis.commentAll);

module.exports = CommentPage;
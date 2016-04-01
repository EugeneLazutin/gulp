var templateFactory = require('./templates');
var createFilter = require('./filter').createFilter;


var TitleFilter = createFilter('title', 'Title', templateFactory.string);
var AuthorFilter = createFilter('author', 'Author', templateFactory.string);
var YearFilter = createFilter('year', 'Year', templateFactory.number);
var PagesFilter = createFilter('pages', 'Pages', templateFactory.number);
var AvailableFilter = createFilter('available', 'Available', templateFactory.bool, true);

module.exports = [TitleFilter, AuthorFilter, YearFilter, PagesFilter, AvailableFilter];

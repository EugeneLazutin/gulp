var templateFactory = require('./templates');

function createFilter(name, createComponent) {
  return {
    name: name,
    Component: createComponent(name),
    isActive: false
  };
}

var TitleFilter = createFilter('title', templateFactory.string);
var AuthorFilter = createFilter('author', templateFactory.string);
var YearFilter = createFilter('year', templateFactory.number);
var PagesFilter = createFilter('pages', templateFactory.number);

var filters = {
  getFiltersList() {
    return [TitleFilter, AuthorFilter, YearFilter, PagesFilter];
  }
};

module.exports = filters;
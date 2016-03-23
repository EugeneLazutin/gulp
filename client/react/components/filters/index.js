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

module.exports = {
  get: () => {
    var TitleFilter = createFilter('title', templateFactory.string);
    var AuthorFilter = createFilter('author', templateFactory.string);
    var YearFilter = createFilter('year', templateFactory.number);
    var PagesFilter = createFilter('pages', templateFactory.number);

    return [TitleFilter, AuthorFilter, YearFilter, PagesFilter];
  }
};
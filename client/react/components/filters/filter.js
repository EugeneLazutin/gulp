var _ = require('lodash');


exports.createFilter = (filterName, text, createComponent, params) => {
  return {
    name: filterName,
    text: text,
    Component: createComponent(_.upperFirst(text), params),
    isActive: false
  };
};
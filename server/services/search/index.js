var types = require('../../../config/client/filter').number.types;

function createConverter(types) {
  var converter = {};
  converter[types.equal] = '$eq';
  converter[types.more] = '$gt';
  converter[types.less] = '$lt';
  return converter;
}

var converter = createConverter(types);

exports.toQuery = params => {
  var query = {};

  if(params.title) {
    query.title = stringFilter(params.title);
  }

  if(params.author) {
    query.author = stringFilter(params.author);
  }

  if(params.year && params.year.value) {
    query.year = numberFilter(params.year.value, params.year.type);
  }

  if(params.pages && params.pages.value) {
    query.pages = numberFilter(params.pages.value, params.pages.type);
  }

  return query;
};

function numberFilter (number, type) {
  var result = {};
  result[converter[type]] = number;
  return result;
}

function stringFilter (str) {
  return {
    $regex: new RegExp(str, 'i')
  };
}



var types = require('../../config/client/filter').number.types;
var _ = require('lodash');

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

  _.forOwn(params, (value, key) => {
    if(_.isString(value)) {
      return query[key] = stringFilter(value);
    }
    if(_.isObject(value) && !_.isUndefined(value.value) && !_.isUndefined(value.type)) {
      return query[key] = numberFilter(value.value, value.type);
    }
    query[key] = value;
  });

  return query;
}
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



exports.ObjState = fields => {
  var obj = {};

  fields.forEach(field => {
    obj[field] = {}
  });

  return obj;
};
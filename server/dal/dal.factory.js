var _ = require('lodash');


exports.create = Model => {
  return item => {
    return new Promise((resolve, reject) => {
      Model.create(item, function (err, createdItem) {
        if (err) {
          return reject(err);
        }
        resolve(createdItem);
      });
    });
  };
};

exports.getAll = Model => {
  return (query, pagination) => {
    return new Promise((resolve, reject) => {
      Model.paginate(query, pagination, function (err, docs) {
        if (err) {
          return reject(err);
        }

        resolve(docs);
      });
    });
  };
};

exports.update = Model => {
  return (id, updates) => {
    return new Promise((resolve, reject) => {
      Model
        .findById(id)
        .exec(function (err, item) {
          if (err) {
            return reject(err);
          }

          _.assign(item, updates);

          item.save(err => {
            if (err) {
              reject(err);
            } else {
              resolve(item);
            }
          });
        });
    });
  };
};

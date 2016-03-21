var agent = require('superagent');

exports.create = book => {
  return new Promise((resolve, reject) => {
    agent
      .post('/api/book')
      .send(book)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
};
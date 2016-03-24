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

exports.getBooks = params => {
  return new Promise((resolve, reject) => {
    agent
      .post('/api/book/all')
      .send(params)
      .end((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.body);
      });
  });
};

exports.getBook = id => {
  return new Promise((resolve, reject) => {
    agent
      .get(`api/book/${id}`)
      .end((err, res) => {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
  });
};
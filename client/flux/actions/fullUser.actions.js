var alt = require('../alt');
var agent = require('superagent');
var cookie = require('react-cookie');
var error = require('../error_handler');
var { hashHistory } = require('react-router');

class FullUserActions {
  fetchFullUser(id) {
    return dispatch => {
      dispatch();

      var token = cookie.load('token');

      if (token) {
        agent
          .get('/api/user/full/' + id)
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            if (err) {
              error(err);
            }

            this.receiveFullUser(res.body);
          });
      }
    }
  }

  receiveFullUser(user) {
    return user;
  }
}

module.exports = alt.createActions(FullUserActions);

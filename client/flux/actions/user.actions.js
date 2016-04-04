var alt = require('../alt');
var agent = require('superagent');
var cookie = require('react-cookie');
var error = require('../error_handler');
var { hashHistory } = require('react-router');

class UserActions {
  tryFetchUser() {
    return dispatch => {
      dispatch();

      var token = cookie.load('token');

      if (token) {
        agent
          .get('/api/user/me')
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            if (!err) {
              this.receiveUser(res.body);
            }
          });
      }
    }
  }

  receiveUser(user) {
    return user;
  }

  logout() {
    return dispatch => {
      dispatch();

      cookie.remove('token');
      var loginLocation = hashHistory.createLocation('/login');
      hashHistory.transitionTo(loginLocation);
    }
  }

  login(userLogin) {
    return dispatch => {
      dispatch();
      this._sendAuth(userLogin, '/auth');
    }
  }

  register(user) {
    return dispatch => {
      dispatch();
      this._sendAuth(user, '/api/user');
    }
  }

  _sendAuth(user, url) {
    agent
      .post(url)
      .send(user)
      .end((err, res) => {
        if (err) {
          error({
              message: res.body.msg
            });
        } else {
          this.receiveUser(res.body.user);
          cookie.save('token', res.body.token);
          hashHistory.goBack();
        }
      });
  }

}

module.exports = alt.createActions(UserActions);


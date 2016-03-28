var alt = require('../alt');
var userActions = require('../actions/user.actions');
var cookie = require('react-cookie');
var agent = require('superagent');


class userStore {
  constructor() {

    this.bindActions(userActions);

    this.user = null;

    var token = cookie.load('token');

    if (token) {
      this.fetchUser(token)
        .then(user => {
          this.setState({user});
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  fetchUser(token) {
    return new Promise((resolve, reject) => {
      agent
        .get('/api/user/me')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.body);
        });
    });
  }

  onSet({ user, token }) {
    this.user = user;
    cookie.save('token', token);
  }

  onRemove() {
    this.user = null;
    cookie.remove('token');
  }

  static isAuthorized() {
    return this.state.user != null;
  }

  static fullName() {
    if (this.state.user) {
      return `${this.state.user.name.first} ${this.state.user.name.last}`;
    }
    return null;
  }
}

module.exports = alt.createStore(userStore);
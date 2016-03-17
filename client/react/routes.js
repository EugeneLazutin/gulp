var React = require('react');
var { Route, IndexRoute } = require('react-router');
var App = require('./App');
var Register = require('./pages/register');
var Login = require('./pages/login');

module.exports = (
    <Route path='/' component={App} >
      <Route path='login' component={Login} />
      <Route path='register' component={Register} />
    </Route>
);

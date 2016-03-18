var React = require('react');
var { Route, IndexRoute } = require('react-router');
var App = require('./app');
var Register = require('./pages/register');
var Login = require('./pages/login');
var BookCreate = require('./pages/book.create');

module.exports = (
    <Route path='/' component={App} >
      <Route path='login' component={Login} />
      <Route path='register' component={Register} />
      <IndexRoute component={BookCreate} />
    </Route>
);

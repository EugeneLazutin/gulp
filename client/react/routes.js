var React = require('react');
import { Route, IndexRoute } from 'react-router';

var App = require('./App');

var Register = require('./pages/register');
var Login = require('./pages/login');

var routes = (
    <Route path='/' component={App} >
      <Route path='login' component={Login} />
      <Route path='register' component={Register} />
    </Route>
);

module.exports = routes;

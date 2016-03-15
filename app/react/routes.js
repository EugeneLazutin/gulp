var React = require('react');
import { Route, IndexRoute } from 'react-router';

var App = require('./App');

var Page = require('./pages/page1');
var Register = require('./pages/register');
var Login = require('./pages/login');

var routes = (
    <Route path='/' component={App} >
      <IndexRoute component={Page} />
      <Route path='login' component={Login} />
      <Route path='register' component={Register} />
    </Route>
);

module.exports = routes;

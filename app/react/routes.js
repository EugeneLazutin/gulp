var React = require('react');
var { Router, Route } = require('react-router');

var App = require('./App');

var Page1 = require('./pages/page1');
var Page2 = require('./pages/page2');
var Page3 = require('./pages/page3');

var routes = (
  <Router>
    <Route name="home" path="/" handler={Page2} />
    <Route name="PAGE_2" path="/page2" handler={Page1} />
    <Route name="PAGE_3" path="/page3" handler={Page3} />
  </Router>
);

module.exports = routes;
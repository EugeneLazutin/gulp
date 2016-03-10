var React = require('react');
var { Route } = require('react-router');

var App = require('./App');

var Page1 = require('./pages/page1');
var Page2 = require('./pages/page2');
var Page3 = require('./pages/page3');

var routes = (
    <Route name="home" path="/" handler={App} >
      <Route name='page1' path="page1" handler={Page1} />
      <Route name='page2' path="page2" handler={Page2} />
      <Route name='page3' path="page3" handler={Page3} />
    </Route>
);

module.exports = routes;

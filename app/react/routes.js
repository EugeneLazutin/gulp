var React = require('react');
var { Route, IndexRoute } = require('react-router');

var App = require('./App');

var Page1 = require('./pages/page1');
var Page2 = require('./pages/page2');
var Page3 = require('./pages/page3');

var routes = (
    <Route path='/' component={App} >

      <IndexRoute component={Page1} />
      <Route path='page2' component={Page2} >
        <IndexRoute component={Page1} />
        <Route path="3" component={Page3} />
      </Route>
      <Route path='page3' component={Page3} />
    </Route>
);

module.exports = routes;

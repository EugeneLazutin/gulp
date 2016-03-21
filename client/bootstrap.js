/**
 * Created by eugene on 3/10/16.
 */

var React = require('react');//Don`t touch, damn!
var { render } = require('react-dom');
var routes = require('./react/routes');
var { Router, hashHistory, browserHistory  } = require('react-router');

render(
  <Router history={hashHistory}>
    {routes}
  </Router>, document.getElementById('root'));

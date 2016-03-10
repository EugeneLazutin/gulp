/**
 * Created by eugene on 3/10/16.
 */

var React = require('react');
var ReactDom = require('react-dom');
var routes = require('./react/routes');
var { Router, hashHistory } = require('react-router');

ReactDom.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('root'));

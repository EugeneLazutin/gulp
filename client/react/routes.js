var React = require('react');
var { Route, IndexRoute } = require('react-router');
var Layout = require('./layout');
var Register = require('./pages/register');
var Login = require('./pages/login');
var BookCreate = require('./pages/book/book.create.js');
var Books = require('./pages/book/books');

module.exports = (
    <Route path='/' component={Layout} >
      <Route path='login' component={Login} />
      <Route path='register' component={Register} />
      <Route path='book' >
        <IndexRoute component={Books} />
        <Route path='create' component={BookCreate} />
      </Route>
    </Route>
);

var React = require('react');
var { Route, IndexRoute } = require('react-router');
var Layout = require('./layout');
var Register = require('./pages/register');
var Login = require('./pages/login');
var BookCreate = require('./pages/book/book_create.js');
var Books = require('./pages/book/books');
var Book = require('./pages/book/book');

module.exports = (
    <Route path='/' component={Layout} >
      <Route path='login' component={Login} />
      <Route path='register' component={Register} />
      <Route path='books' component={Books} />
      <Route path='book/:id' component={Book} />
      <Route path='create-book' component={BookCreate} />
    </Route>
);

var React = require('react'); //don`t touch, damn! required!
var Books = require('./../../components/book/books');
var limit = require('../../../../config/client/pagination').limit;
var { Link } = require('react-router');
var bookFilters = require('../../components/filters/book');
var createListPage = require('../list.factory');
var userStore = require('../../../flux/stores/user.store');


var renderButton = () => {
  if(userStore.isAdmin()) {
    return (
      <Link to='/create-book' className={'btn btn-sm btn-success'} title='create new book'>
      <span className='glyphicon glyphicon-plus'></span>
    </Link>
    );
  }
};

var BooksPage = createListPage(Books, bookFilters, limit.lg, '/api/book/all', renderButton);

module.exports = BooksPage;

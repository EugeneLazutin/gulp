var React = require('react');
var { RouteHandler, Link } = require('react-router');
var { PropTypes } = React;

var App = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div>
        <h1>Pages</h1>
        <ul className="navigation">
          <Link to="home">
            <li className="navigation-item">Home</li>
          </Link>
          <Link to="page1">
            <li className="navigation-item">page 1</li>
          </Link>
          <Link to="page2">
            <li className="navigation-item">page 2</li>
          </Link>
          <Link to="page3">
            <li className="navigation-item">page 3</li>
          </Link>
        </ul>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = App;
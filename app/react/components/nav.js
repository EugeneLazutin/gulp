var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className="navbar-toggle collapsed" data-toggle="collapse" data-target="#links" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Brand</a>
          </div>

          <div className="collapse navbar-collapse" id="links">
            {this.props.children}
          </div>
        </div>
      </nav>
    );
  }
});

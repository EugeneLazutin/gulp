var React = require('react');
var classNames = require('classnames');
var bookActions = require('../../../flux/actions/book.actions');


var CommentForm = React.createClass({
  propTypes: {
    bookId: React.PropTypes.string
  },

  getInitialState() {
    return {
      message: ''
    };
  },

  _handleChange(evt) {
    this.setState({
      message: evt.target.value
    });
  },

  _handleClick() {
    if(this.state.message) {
      bookActions.createComment({
        message: this.state.message,
        bookId: this.props.bookId
      });
      this.refs.message.value = '';
    }
  },

  _btnClass() {
    return classNames({
      'btn btn-info': true,
      'disabled': !this.state.message
    });
  },

  render() {
    return (
      <div className="create-comment">
        <div className="col-sm-10">
          <textarea ref="message" className="message" onChange={this._handleChange}></textarea>
        </div>
        <div className="col-sm-2">
          <button className={this._btnClass()} onClick={this._handleClick}>Send</button>
        </div>
      </div>
    );
  }
});

module.exports = CommentForm;
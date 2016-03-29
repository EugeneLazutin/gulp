var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
  propTypes: {
    comment: React.PropTypes.object
  },

  _fullname(){
    return this.props.comment.user.name.first + ' ' + this.props.comment.user.name.last;
  },

  render() {
    var { comment } = this.props;

    return (
      <div className="comment">
        <div>{moment(comment.date).calendar()} {this._fullname()} wrote:</div>
        <div>{comment.message}</div>
      </div>
    );
  }
});
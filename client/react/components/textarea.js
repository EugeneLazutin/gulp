var React = require('react');
var classNames = require('classnames');

module.exports = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    required: React.PropTypes.bool
  },

  validate() {
    if (this.state.error) {
      return false;
    }
    if (!(this.state.value && this.state.value.length) && this.props.required) {
      this.setState({
        error: true
      });
      return false;
    }
    return true;
  },

  getValue() {
    return this.state.value;
  },

  getInitialState(){
    return {
      value: '',
      error: false
    }
  },

  _onChange(evt) {
    var value = evt.target.value;

    this.setState({
      value: value,
      error: this.props.required && !(value && value.length)
    });
  },

  /**
   * temporary to set large description
   */
  componentDidMount() {
    this.setState({
      value: this.refs.value.value
    });
  },

  _formGroupClass() {
    return classNames({
      'form-group': true,
      'has-error': !!this.state.error
    });
  },

  render() {
    return (
      <div className={this._formGroupClass()}>
        <textarea ref="value" className="form-control" onChange={this._onChange} placeholder={this.props.placeholder}
                  defaultValue={largeText}/>
      </div>
    );
  }
});

var largeText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type
specimen book. It has survived not only five centuries, but also the leap into
electronic typesetting, remaining essentially unchanged. It was popularised in
the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
  and more recently with desktop publishing software like Aldus PageMaker including
versions of Lorem Ipsum.`;
var React = require('react');
var RouterActions = require('../router/RouterActions');

var Link = React.createClass({
  propTypes: {
    path: React.PropTypes.string,
    params: React.PropTypes.object,
    query: React.PropTypes.object
  },

  render: function() {
    return this.transferPropsTo(
      <a href="#" onClick={this.handleClick}>{this.props.children}</a>
    );
  },

  handleClick: function(e) {
    e.preventDefault();
    RouterActions.navigateTo({
      path: this.props.path,
      params: this.props.params,
      query: this.props.query
    });
  }
});

module.exports = Link;

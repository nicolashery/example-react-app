var React = window.React = require('react');
var RouterActions = require('../router/RouterActions');

var Link = React.createClass({
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

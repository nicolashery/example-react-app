var React = require('react');
var RouterService = require('../router/RouterService');

var Link = React.createClass({
  propTypes: {
    path: React.PropTypes.string,
    params: React.PropTypes.object,
    query: React.PropTypes.object
  },

  render: function() {
    return this.transferPropsTo(
      <a href={this.getHref()}>{this.props.children}</a>
    );
  },

  getHref: function() {
    return '#' + RouterService.uriFromRoute({
      path: this.props.path,
      params: this.props.params,
      query: this.props.query
    });
  }
});

module.exports = Link;

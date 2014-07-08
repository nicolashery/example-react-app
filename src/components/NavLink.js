var React = window.React = require('react');
var Link = require('./Link');

var NavLink = React.createClass({
  propTypes: {
    active: React.PropTypes.bool
  },

  render: function() {
    if (this.props.active) {
      return <span>{this.props.children}</span>;
    }

    return this.transferPropsTo(
      <Link>{this.props.children}</Link>
    );
  }
});

module.exports = NavLink;

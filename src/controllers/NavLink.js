var React = require('react');
var Link = require('../router/Link');

var NavLink = React.createClass({
  propTypes: {
    active: React.PropTypes.bool
  },

  render: function() {
    if (this.props.active) {
      return (
        <li className="active">
          <a>{this.props.children}</a>
        </li>
      );
    }

    return (
      <li>
        {this.transferPropsTo(<Link>{this.props.children}</Link>)}
      </li>
    );
  }
});

module.exports = NavLink;

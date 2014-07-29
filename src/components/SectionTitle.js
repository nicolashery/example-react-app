var React = window.React = require('react');

require('./SectionTitle.less');

var SectionTitle = React.createClass({
  render: function() {
    return <h2 className="SectionTitle">{this.props.children}</h2>;
  }
});

module.exports = SectionTitle;

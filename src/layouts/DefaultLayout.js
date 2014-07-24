var React = require('react');

var DefaultLayout = React.createClass({
  propTypes: {
    header: React.PropTypes.renderable,
    title: React.PropTypes.renderable,
    content: React.PropTypes.renderable
  },

  render: function() {
    return (
      <div>
        {this.props.header}
        <h1>{this.props.title}</h1>
        {this.props.content}
      </div>
    );
  }
});

module.exports = DefaultLayout;

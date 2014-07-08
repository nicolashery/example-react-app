var React = require('react');

var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Not found</h1>
        <p>Could not find: <strong>{this.props.uri}</strong></p>
      </div>
    );
  }
});

module.exports = NotFoundPage;

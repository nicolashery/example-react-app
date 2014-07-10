var React = require('react');

var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Not found</h1>
        <p>Sorry! Could not find what you were looking for...</p>
      </div>
    );
  }
});

module.exports = NotFoundPage;

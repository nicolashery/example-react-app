var React = require('react');

var debug = require('debug')('app:NotFoundPage');

var NotFoundPage = React.createClass({
  render: function() {
    debug('render');
    return (
      <div>
        <p>Sorry! Could not find what you were looking for...</p>
      </div>
    );
  }
});

module.exports = NotFoundPage;

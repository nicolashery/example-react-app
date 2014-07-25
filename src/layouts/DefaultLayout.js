var React = require('react');

require('./DefaultLayout.less');

var DefaultLayout = React.createClass({
  propTypes: {
    header: React.PropTypes.renderable,
    title: React.PropTypes.renderable,
    content: React.PropTypes.renderable
  },

  render: function() {
    return (
      <div className="DefaultLayout">
        <div className="DefaultLayout-header navbar navbar-default">
          <div className="container">{this.props.header}</div>
        </div>
        <div className="DefaultLayout-title container">
          <div className="row">
            <div className="col-xs-12 text-primary">{this.props.title}</div>
          </div>
        </div>
        <div className="DefaultLayout-content container">
          <div className="row">
            <div className="col-xs-12">{this.props.content}</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DefaultLayout;

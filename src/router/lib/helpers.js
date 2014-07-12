var fn = require('fn.js');

var helpers = {};

helpers.slice = function() {
  Array.prototype.slice.call(arguments);
};

helpers.bind = function(func, context) {
  return function() {
    func.apply(context, Array.prototype.slice.call(arguments));
  };
};

helpers.map = fn.map;

helpers.reduce = fn.reduce;

helpers.each = fn.each;

helpers.properties = fn.properties;

module.exports = helpers;

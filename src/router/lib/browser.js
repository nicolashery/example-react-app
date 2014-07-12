var helpers = require('./helpers');

var browser = {};

browser.on = function(eventName, handler, context) {
  window.addEventListener(eventName, helpers.bind(handler, context), false);
};

browser.uriEncode = function(str) {
  return encodeURIComponent(str);
};

browser.uriDecode = function(str) {
  return decodeURIComponent(str);
};

browser.setUri = function(uri) {
  location.hash = uri;
};

browser.replaceUri = function(uri) {
  location.replace('#' + uri);
};

browser.getCurrentUri = function () {
  return location.hash.replace('#', '');
};

module.exports = browser;

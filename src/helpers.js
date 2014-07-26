var helpers = {};

helpers.trim = function(str) {
  if (!(str && str.length)) {
    return '';
  }
  return str.trim();
};

module.exports = helpers;

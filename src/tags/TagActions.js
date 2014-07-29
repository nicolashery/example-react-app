var Fluxy = require('fluxy');
var TagConstants = require('./TagConstants');
var TagService = require('./TagService');

module.exports = Fluxy.createActions({
  fetch: function(token) {
    var self = this;
    self.dispatchAction(TagConstants.TAGS_FETCH);

    TagService.fetch(token)
      .then(function (result) {
        self.dispatchAction(TagConstants.TAGS_FETCH_SUCCESS, {tags: result});
      })
      .catch(function (err) {
        self.dispatchAction(TagConstants.TAGS_FETCH_FAIL, {error: err});
      });
  },

  clearRequests: function() {
    this.dispatchAction(TagConstants.TAGS_CLEAR_REQUESTS);
  }
});

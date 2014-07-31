var Fluxy = require('fluxy');
var ItemConstants = require('./ItemConstants');
var ItemService = require('./ItemService');

module.exports = Fluxy.createActions({
  fetch: function(token) {
    var self = this;
    self.dispatchAction(ItemConstants.ITEMS_FETCH);

    ItemService.fetch(token)
      .then(function (result) {
        self.dispatchAction(ItemConstants.ITEMS_FETCH_SUCCESS, result);
      })
      .catch(function (err) {
        self.dispatchAction(ItemConstants.ITEMS_FETCH_FAIL, {error: err});
      });
  },

  clearRequests: function() {
    this.dispatchAction(ItemConstants.ITEMS_CLEAR_REQUESTS);
  }
});

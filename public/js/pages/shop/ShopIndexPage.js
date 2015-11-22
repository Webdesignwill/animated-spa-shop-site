
define([
  'DefaultShopPage',
  'json!data/moltin.json',
  'App'
], function (DefaultShopPage, moltinData, App) {

  "use strict";

  return DefaultShopPage.extend({

    startListening: function () {
      this.listenTo(App.get('moltin'), 'change:products', this.render, this);
    },

    getRenderObject: function () {

      var json = {};
      var prices = [];

      moltinData.productIds.forEach(function (id) {
        var product = App.get('moltin')._getProduct(id);
        if (product) {
          // Without tax
          prices.push(product.price.data.formatted.without_tax.slice(0, 1) + ' ' + product.price.data.rounded.without_tax);

          // With tax
          // prices.push(product.price.value.slice(0, 1) + ' ' + product.price.data.rounded.with_tax);
        }
      });

      json.prices = prices;

      return json;
    }

  });
});

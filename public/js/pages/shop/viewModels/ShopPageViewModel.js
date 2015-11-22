define([
  'Backbone',
  'App'
], function (Backbone, App) {

  "use strict";


  return Backbone.Model.extend({

    toJSON: function () {

      var json = Backbone.Model.prototype.toJSON.call(this);

      var product = App.get('moltin')._getProduct(json.productId);
      if (product) {
        // Format price string. First char is currency symbol.
        json.price = product.price.value.slice(0, 1) + ' ' + product.price.data.rounded.without_tax;
      }

      return json;
    }
  });
});

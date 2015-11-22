
define([
  'App',
  'DefaultShopPage',
], function (App, DefaultShopPage) {

  "use strict";

  var ShopEReceiptPage = DefaultShopPage.extend({

    postInitialize : function () {

      DefaultShopPage.prototype.postInitialize.call(this);

      // @TODO: This logic should be extracted to Router
      // redirect is user didn't successfuly checkout yet
      if (_.isUndefined(App.get('moltin').get('cartPayed'))) {
        App.get('Router').navigate('!/shop/details', {trigger : true});
      }
    },

    getRenderObject : function () {

      var items = [];
      var cartPayed = App.get('moltin').get('cartPayed');
      if (cartPayed) {
        Object.keys(cartPayed.contents).forEach(function (key) {
          items.push({
            title : cartPayed.contents[key].title,
            price : cartPayed.contents[key].pricing.formatted.without_tax,
            quantity : cartPayed.contents[key].quantity
          });
        });
      }

      return {
        items: items,
        order : App.get('moltin').get('order')
      };
    }
  });

  return ShopEReceiptPage;

});

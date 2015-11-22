
define([
  'App',
  'DefaultShopPage',
  'Responsiveness'
], function (App, DefaultShopPage, Responsiveness) {

  "use strict";

  var ShopShippingPage = DefaultShopPage.extend({

    events: {
      'click ul a': 'onClickA',
    },

    redirectToDetails : function () {
      App.get('Router').navigate('!/shop/details', {trigger : true});
    },

    startListening: function () {
      this.listenTo(App.get('moltin'), 'change:shipping', this.render.bind(this));
    },

    getRenderObject : function () {
      return {
        shipping : App.get('moltin').get('shipping')
      };
    },

    setElements : function () {
      this.$shopShippingText = this.$('.shop-shipping-text');
      this.$aShipping = this.$('ul a');
    },

    postRender: function () {
      DefaultShopPage.prototype.postRender.call(this);
      this.$('.shop-shipping-text').css('min-height', $(window).height() - 60);
    },

    // Save shipping method to moltin model
    onClickA : function (event) {

      event.preventDefault();

      var $elem = $(event.currentTarget);
      var slug = $elem.attr('data-shipping-slug');
      App.get('moltin').set('shippingSlug', slug);

      // also set currency
      var currency;
      switch (slug.toLowerCase()) {
        case 'europe':
          currency = 'EEE';
          break;
        case 'us':
        case 'world':
          currency = 'UUU';
          break;
        default:
          currency = 'GBP';
      }
      App.get('moltin').setCurrency('GBP');

      this.redirectToDetails();
    }
  });

  return ShopShippingPage;

});

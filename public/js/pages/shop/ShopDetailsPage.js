
define([
  'App',
  'DefaultShopPage',
  'MoltinModel'
], function (App, DefaultShopPage, MoltinModel) {

  "use strict";

  var ShopDetailsPage = DefaultShopPage.extend({

    // @TODO: setup forms automatically in Page
    form : undefined,

    events : {
      'click #shipping-shipping-address-button' : 'onClickShippingAddressButton',
      'click #shop-details-review-order' : 'onClickReviewOrder'
    },

    postInitialize : function () {

      DefaultShopPage.prototype.postInitialize.call(this);

      // @TODO: This logic should be extracted to Router
      // redirect is user didn't select a shipping method yet
      var cart = App.get('moltin').get('cart');
      if (_.isUndefined(cart) || cart.contents.length === 0) {
        App.get('Router').navigate('!/shop', {trigger : true});
        return;
      }

      // redirect if user didn't select a shipping method yet
      if (_.isUndefined(App.get('moltin').get('shippingSlug'))) {
        App.get('Router').navigate('!/shop/shipping', {trigger : true});
        return;
      }
    },

    postRender : function () {

      DefaultShopPage.prototype.postRender.call(this);

      this.form = new App.Forms();
      this.setupForm();
    },

    setupForm : function () {

      this.form.init(App.get('moltin'), {
        name : this.model.get('name'),
        validationModelName : 'ValidateShopModel',
        action : 'checkout',
        el : this.$el.find('form')
      }, function (result, data, status) {
        if(result) {
          App.get('Router').navigate('!/shop/order-confirmation', {trigger : true});
        }
      });
    },

    onClickShippingAddressButton : function () {
      this.$('.shipping-shipping-address').toggleClass('hidden');
    },

    onClickReviewOrder : function () {
      App.trigger('cart:toggle');
    }
  });

  return ShopDetailsPage;

});

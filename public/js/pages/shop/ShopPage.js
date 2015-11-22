
define([
  'App',
  'DefaultShopPage',
  'CounterView',
  'GalleryView',
], function (App, DefaultShopPage, CounterView, GalleryView) {

  "use strict";

  var ShopPage = DefaultShopPage.extend({

    subViews: [
      {
        view: GalleryView,
        options: {
          images: undefined
        }
      },
      {
        view: CounterView,
        options: {
          el: '.counter'
        }
      }
    ],
    postInitialize: function () {

      DefaultShopPage.prototype.postInitialize.call(this);

      this.subViews[0].options.images = this.viewModels[1].instance.toJSON().images;
      this.subViews[0].options.mobileImages = this.viewModels[1].instance.toJSON().mobileImages;
    },

    startListening: function () {
      this.listenTo(App.get('moltin'), 'change:products', this.render, this);
      this.listenTo(App.get('moltin'), 'change:products', this.showButton, this);
    },

    getRenderObject : function () {
      var inStock;
      var product = App.get('moltin')._getProduct(this.viewModels[1].instance.toJSON().productId);
      if (product) {
        if (product.stock_level > 0) {
          inStock = true;
        } else {
          inStock = false;
        }
      }
      return {
        inStock: inStock
      };
    },

    setElements : function () {
      this.$button = this.$('button.shop-button-buy');
    },

    postRender : function () {

      DefaultShopPage.prototype.postRender.call(this);

      var selectedSize = App.get('moltin').get('selectedSize');
      if (selectedSize) {
        this.showButton();
        this.selectSize(selectedSize);
      }
    },

    events: {
      'click .ul-selectable a' : 'onClickUlSelectable',
      'click button.shop-button-buy': 'onClickButton'
    },

    // @TODO: Extract this functionality into a reusable subview. Same logic is used in shop-shipping
    //        Have dynamic data and class attributes and ViewModel to save selectedSize
    onClickUlSelectable : function (event) {

      event.preventDefault();

      var $elem = $(event.currentTarget);

      var selectedSize = $elem.attr('data-shop-size');
      App.get('moltin').set('selectedSize', selectedSize);
      this.selectSize(selectedSize);
      this.showButton();
    },

    selectSize : function (size) {
      this.$('.ul-selectable a').removeClass('ul-selectable-selected');
      this.$('.ul-selectable a[data-shop-size="' + size + '"]').addClass('ul-selectable-selected');
    },

    showButton : function (force) {
      var inStock = this.getRenderObject().inStock;
      if (inStock === false || force === 'no-stock') {
        return this.$button.text(this.$button.data('out-of-stock-text'));
      }
      if (inStock === true && App.get('moltin').get('selectedSize')) {
        this.$button.text('Add to cart');
        this.$button.removeClass('disabled').removeAttr('disabled');
      }
    },

    onClickButton : function (event) {

      this.showPreorder();
      this.disableButton();
      $.when(App.get('moltin').incrementCart(this.viewModels[1].instance.toJSON().productId, this.getQuantity(), App.get('moltin').get('selectedSize')))
        .then(function (error) {
          if(error) {
            return this.showButton('no-stock');
          }
          this.enableButton();
          if (this.viewModels[0].instance.get('phase') === 'waitingList') {
            App.get('Router').navigate('!/shop/waiting-list', {trigger: true});
          }
        }.bind(this));
    },

    getQuantity : function () {
      return this.subViews[1].viewInstance.counter;
    },

    buttonText: undefined,
    disableButton : function () {
      this.$button.attr('disabled', 'disabled').addClass('disabled');
      this.buttonText = this.$button.text();
      this.$button.text('Adding to cart');
    },
    enableButton : function () {
      this.$button.removeAttr('disabled').removeClass('disabled');
      this.$button.text(this.buttonText);
    },

    showPreorder : function () {
      this.$('#shop-page-preorder').removeClass('hidden');
    }

  });

  return ShopPage;

});


define([
  'App',
  'Backbone',
  'handlebars',
  'text!templates/partials/checkout.tpl'
], function (App, Backbone, handlebars, template) {

  "use strict";

  return Backbone.View.extend({

    className: 'container-fluid',

    events: {
      'click #checkout-button-buy' : 'onClickCheckoutButtonBuy',
      'click #checkout-button-empty-cart' : 'onClickButtonEmptyCart'
    },

    startListening : function () {
      this.listenTo(App.get('moltin'), 'change:shippingSlug', this.render.bind(this));
      this.listenTo(App.get('moltin'), 'change:shipping', this.render.bind(this));
      this.listenTo(App.get('moltin'), 'change:currency', this.render.bind(this));
    },

    getRenderObject : function () {

      var moltin = App.get('moltin');
      var products = moltin.get('products');
      var productSizes = this.getRenderObjectProductSizes();
      var productQtys = this.getRenderObjectProductQtys(productSizes);
      var currencySymbol;
      var totalIncludingShipping;
      var formattedIncShipping;
      // @TODO: This is ugly. Order specified by Moltin
      products = [products[1], products[0]];

      if(moltin.get('shippingSlug') && moltin.get('cart')) {
        currencySymbol = moltin.get('cart').totals.post_discount.formatted.with_tax.slice(0, 1);
        totalIncludingShipping = moltin.get('cart').totals.post_discount.rounded.without_tax + moltin.getShippingPriceUnformatted();
        formattedIncShipping = currencySymbol + totalIncludingShipping;
      }

      // var tots = order.totals.subtotal.rounded + order.shipping.data.price.data.rounded.with_tax,
      //         currencySymbol = order.totals.subtotal.formatted.slice(0, 1);

      var obj = {
        productsEmpty : products.length === 0,
        products : products,
        subtotal : moltin.get('shippingSlug') ? formattedIncShipping : moltin.get('subtotal'),
        tax : moltin.get('tax'),
        total : moltin.get('total'),
        qtyProduct0 : moltin.get('qtyProduct0'),
        qtyProduct1 : moltin.get('qtyProduct1'),
        showProduct0 : productQtys[0] > 0,
        showProduct1 : productQtys[1] > 0,
        showBuyButton : moltin.get('total_items') > 0,
        productSizes : productSizes,
        productQtys : productQtys,
        shippingSlug : moltin.get('shippingSlug'),
        shippingPrice : moltin.getShippingPrice()
      };

      return obj;
    },

    // @TODO: move into ViewModel
    getRenderObjectProductSizes : function () {

      if (_.isUndefined(App.get('moltin').get('cart'))) {
        return;
      }

      var productIds = App.get('moltin').productIds;
      var contents = App.get('moltin').get('cart').contents;
      var productSizes = [[], []];

      Object.keys(contents).forEach(function (key) {
        if (!_.isArray(contents[key].modifiers) || _.isEmpty(contents[key].modifiers)) {
          return;
        }
        var obj = {
          size : contents[key].modifiers[0].var_title,
          qty : contents[key].quantity > 0 ? contents[key].quantity : ''
        };
        if (contents[key].modifiers[0].data.product === productIds[0]) {
          productSizes[0].push(obj);
        }
        else if (contents[key].modifiers[0].data.product === productIds[1]) {
          productSizes[1].push(obj);
        }
      });

      return productSizes;
    },

    // @TODO: move into ViewModel
    getRenderObjectProductQtys : function (productSizes) {

      if (!productSizes) {
        return [0, 0];
      }

      var ret = [0, 0];

      var i = 0;
      productSizes.forEach(function (productSize) {
        var total = 0;
        productSize.forEach(function (product) {
          var qty = product.qty !== '' ? product.qty : 1;
          total += qty;
        });
        ret[i++] = total;
      });

      return ret;
    },

    // @TODO: move into postRender method
    render: function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(this.getRenderObject());
      this.$el.html(compiled);

      // necessary for subviews
      // @LINK: http://stackoverflow.com/questions/9271507/how-to-render-and-append-sub-views-in-backbone-js
      this.delegateEvents();
      return this;
    },

    onClickCheckoutButtonBuy : function (event) {
      App.trigger('cart:close');
    },

    // @TODO: Handle errors
    onClickButtonEmptyCart : function (event) {

      $.when(App.get('moltin').deleteCart()).done(function () {
        this.render();
        this.trigger('emptied');
        if(App.get('page').model.get('name') === 'details') {
          App.get('Router').navigate('!/shop', {trigger : true});
        }
      }.bind(this));
    }

  });
});

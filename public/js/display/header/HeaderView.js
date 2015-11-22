
define([
  'App',
  'handlebars',
  'text!js/display/header/templates/header.tpl',
  'CheckoutView',
  'HeaderViewModel',
  'ShopViewModel'
], function (App, handlebars, template, CheckoutView, HeaderViewModel, ShopViewModel) {

  "use strict";

  var Header = Backbone.View.extend({

    navItems : {},

    events : {
      'click .toggle-sidebar' : 'handler',
      'click #header-button-cart' : 'onClickHeaderButtonCheckout',
      'mouseover .back-to-home' : 'toggleHome',
      'mouseout .toggle-home' : 'toggleHome'
    },

    toggleHome : function (e) {
      var action = e.type === "mouseover" ? "addClass" : "removeClass";
      this.$toggleHome[action]('swap-content');
    },

    checkoutView : undefined,
    headerViewModel : undefined,

    initialize : function () {

      this.headerViewModel = new HeaderViewModel();
      this.shopViewModel = new ShopViewModel();

      this.checkoutView = new CheckoutView();
      this.checkoutView.on('emptied', this.onEmptyCheckout.bind(this));

      this.render();

      this.listenTo(App.get('moltin'), 'change', function (app, moltin) {
        // @TODO: Check if it is necessary to rerender the whole view. Only the cart counter should change.
        this.render();
      }, this);

      this.listenTo(App, 'cart:toggle', this.showHideCheckout.bind(this));
      this.listenTo(App, 'cart:close', function () {
        this.showHideCheckout(true);
      }.bind(this));

      this.listenTo(App, 'change:nextPage', function () {
        this.render();
      }, this);
    },

    handler : function (e) {
      e.preventDefault();
      App.trigger('sidebar:toggle');
    },

    setElements : function () {
      this.$body = $('body');
      this.$toggleHome = this.$('.toggle-home');
      this.$variableText = this.$('.variable-text');
      this.$buttonCart = this.$('#header-button-cart');
      this.$checkout = this.$('#header-checkout');
    },

    changeHeaderByPage : function (page) {
      this.$variableText.html(page.model.get('header'));
    },

    render : function () {

      // @BUG: this view seems to get rendered before App.page is set
      // @TODO: Extract to view model
      var page = App.get('nextPage');
      var header = page ? page.model.get('header') : '';

      var renderObject = {
        header: header,
        showShopButton : !page || page.model.get('path').substring(0, 7) !== '#!/shop',
        showCartButton : !this.shopViewModel.toJSON().isWaitingListPhase && App.get('moltin').get('total_items') > 0,
        total_items : App.get('moltin').get('total_items')
      };

      // merge in view model attributes
      renderObject = $.extend(renderObject, this.headerViewModel.toJSON());

      var tpl = handlebars.compile(template);
      var compiled = tpl(renderObject);
      this.$el.html(compiled);

      this.setElements();

      // render checkout subview
      this.$checkout.append(this.checkoutView.$el);
      this.checkoutView.render();

      return this;
    },

    // Remove listeners from subview
    remove : function () {
      this.checkoutView.remove();
      Backbone.View.prototype.remove.call(this);
    },

    showHideCheckout: function (hidden) {
      // cast to Boolean
      var hidden = hidden ? true : false;
      this.headerViewModel.set('checkoutHidden', hidden);
      this.$body.removeClass('cart-open');
      if (!hidden) this.$body.addClass('cart-open');
      this.render();
    },

    onClickHeaderButtonCheckout : function (event) {
      event.preventDefault();
      this.showHideCheckout(!this.headerViewModel.get('checkoutHidden'))
    },

    onEmptyCheckout : function () {
      this.showHideCheckout(true);
    }
  });

  return Header;

});

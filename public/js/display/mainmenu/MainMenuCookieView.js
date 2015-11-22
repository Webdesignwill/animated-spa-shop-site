define([
  'Backbone',
  'App',
  'jsCookie'
], function (Backbone, App, Cookies) {

  "use strict";

  return Backbone.View.extend({

    shown: false,

    className: 'cookie',

    events : {
      'click #cookie-button': 'onClickButton',
    },

    render : function () {

      if (Cookies.get('cookies_accepted') === 'accepted') {
        return this;
      }
      this.$el.html('<button id="cookie-button">^</button>');
      this.setElements().startListening();
      return this;
    },

    setElements : function () {
      this.$button = this.$('button');
      this.$cookieMessage = $('#cookie-message');
      this.$input = this.$cookieMessage.find('input');
      return this;
    },

    startListening: function () {
      this.$input.on('change', this.onChangeCheckbox.bind(this));
      return this;
    },

    onClickButton : function (event) {
      this.show();
    },

    show: function () {

      $('#app-content').hide();
      $('#cookie-message').removeClass('hidden');
      setTimeout(function () {
        $('html, body').scrollTop($(document).height());
      }, 100);
    },

    hide: function () {
      $('#app-content').show();
      $('#cookie-message').addClass('hidden');
      this.$button.hide();

      var $container = $('#app-content');
      var scrollToElement = $container.height() < 20 ? 0 : $container.offset().top;
      $('html, body').scrollTop(scrollToElement - 60);
    },

    onChangeCheckbox : function (event) {
      if (this.$input.val() === 'on') {
        Cookies.set('cookies_accepted', 'accepted');
        App.get('moltin').initialize();
        // reload page when not at home
        // @LINK: http://stackoverflow.com/questions/9932886/refresh-backbonejs-on-with-same-url-hash
        this.hide();
      }
    }
  });
});


define([
  'App',
  'Page',
  'ShopViewModel',
  'jsCookie'
], function (App, Page, ShopViewModel, Cookies) {

  "use strict";

  var DefaultShopPage = Page.extend({

    viewModels : [
      ShopViewModel
    ],

    postRender : function () {
      $('.page').css('min-height', $(window).height() - 60);
    },

    postInitialize : function () {

      if (Cookies.get('cookies_accepted') !== 'accepted') {
        $('#app-content').hide();
        $('#cookie-message').removeClass('hidden');
        setTimeout(function () {
          $('html, body').scrollTop($(document).height());
        }, 100);

        App.set('cookiebar:showing', true);

      }
    }
  });

  return DefaultShopPage;

});

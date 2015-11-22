
define([
  'ShopPage',
  'ShopViewModel',
  'ShopPageMillerPinkViewModel',
], function (ShopPage, ShopViewModel, ShopPageMillerPinkViewModel) {

  'use strict';

  return ShopPage.extend({

    viewModels: [
      ShopViewModel,
      ShopPageMillerPinkViewModel
    ]
  });
});

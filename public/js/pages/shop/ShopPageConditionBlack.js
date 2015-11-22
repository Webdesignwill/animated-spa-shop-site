
define([
  'ShopPage',
  'ShopViewModel',
  'ShopPageConditionBlackViewModel',
], function (ShopPage, ShopViewModel, ShopPageConditionBlackViewModel) {

  'use strict';

  return ShopPage.extend({

    viewModels: [
      ShopViewModel,
      ShopPageConditionBlackViewModel
    ]
  });
});

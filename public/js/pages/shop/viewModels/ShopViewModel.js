define([
  'Backbone',
], function (Backbone) {

  "use strict";

  var ViewModel = Backbone.Model.extend({

    waitingList: {
      buttonText: 'Join the waiting list',
      isWaitingListPhase: true
    },

    preorder : {
      buttonText: 'Preorder',
      isPreorderPhase: true
    },

    shop : {
      buttonText: 'Add to cart',
    },

    defaults : {
      phase : 'shop'
    },

    toJSON: function () {

      var json = Backbone.Model.prototype.toJSON.call(this);

      switch (json.phase) {
        case 'waitingList':
          return this.waitingList;
        case 'preorder':
          return this.preorder;
        case 'shop':
          return this.shop;
        default:
          return {};
      }
    }
  });

  return ViewModel;
});

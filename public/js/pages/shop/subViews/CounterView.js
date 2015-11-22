
define([
  'App',
  'Backbone',
], function (App, Backbone) {

  "use strict";

  var CounterView = Backbone.View.extend({

    counter : 1,

    events : {
      'click button.counter-button-min' : 'onClickButtonMin',
      'click button.counter-button-plus' : 'onClickButtonPlus'
    },

    setCounter : function (counter) {
      if (counter < 1) {
        counter = 1;
      }
      this.counter = counter;
    },

    renderCounter : function () {
      this.$('span.shop-quantity').html(this.counter);
    },

    onClickButtonMin : function (event) {
      this.setCounter(--this.counter);
      this.renderCounter();
    },

    onClickButtonPlus : function (event) {
      this.setCounter(++this.counter);
      this.renderCounter();
    }
  });

  return CounterView;
});

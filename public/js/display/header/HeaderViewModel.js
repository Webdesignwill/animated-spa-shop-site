define([
  'Backbone',

], function (Backbone) {

  "use strict";

  var HeaderViewModel = Backbone.Model.extend({

    defaults : {
      checkoutHidden : true
    }
  });

  return HeaderViewModel;
});


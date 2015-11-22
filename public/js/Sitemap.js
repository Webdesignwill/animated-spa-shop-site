
define([
  'App',
  'PageModel'
],

function (App, PageModel) {

  "use strict";

  var Sitemap = Backbone.Collection.extend({

    model : PageModel,

    initialize : function () {},

    parse : function (model) {
      return model;
    }
  });

  return new Sitemap();

});

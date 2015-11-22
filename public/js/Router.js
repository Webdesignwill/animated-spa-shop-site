
define([
  'App',
  'PageFactory'
],

function (App, PageFactory) {

  "use strict";

  var Router = Backbone.Router.extend({

    routes : {
      '!(/)' : 'home'
    },

    initialize : function () {

      this.listenTo(App.get('Sitemap'), 'add', function (model) {
        this.addRoute(model);
      }, this);

      this.listenTo(App, 'change:status', function (app, prop) {
        if(prop === 'ready') {
          this.ready();
        }
      }, this);

      this.pageFactory = new PageFactory();
    },

    ready : function () {
      this.$appContent = $('#app-content');
    },

    addRoute : function (model) {
      var self = this;
      this.route(model.get('route'), model.get('name'), function (option) {
        app_require([model.get('page')], function (Page) {
          self.pageFactory.make(self.$appContent, model, Page, option);
        });
      });
    },

    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    home : function (option) {
      var model = App.get('Sitemap').findWhere({homepage : true}),
            self = this;

      app_require([model.get('page')], function (Page) {
        self.pageFactory.make(self.$appContent, model, Page, option);
      });
    }

  });

  return Router;

});
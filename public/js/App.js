
define([
  'Backbone',
  'require',
  'handlebars',
  'Responsiveness',
  'json!js/config.json',
  'MoltinModel'
], function (Backbone, app_require, handlebars, Responsiveness, config, MoltinModel) {

  // @TODO: load config using require.json plugin

  "use strict";

  var App = Backbone.Model.extend({

    defaults : {
      Me : null,
      Router : null,
      status : null,
      message : null,
      page : null,
      moltin : undefined
    },

    initialize : function () {

      // @TODO: Move into listenTo callback function
      var to;

      // @TODO: Set this from config via an global API settings
      this.initMoltin();
    },

    initMoltin: function () {
      this.set('moltin', new MoltinModel());
    },

    // @TODO: return promise
    load : function () {

      var self = this;

      function registerPartials () {

        var partials = _.isArray(config.partials) ? config.partials : [];
        var paths = partials.map(function (partial) {
          return 'text!templates/partials/' + partial + '.tpl';
        });

        app_require(paths, function () {
          var i = 0;
          var partialsObj = {};
          var args = Array.prototype.slice.call(arguments);
          partials.forEach(function (partial) {
            partialsObj[partial] = args[i++];
          }.bind(this));
          handlebars.registerPartial(partialsObj);
          getApi();
        });
      }

      function getApi () {
        app_require(['api'], function (config) {
          function load () {
            req(['Api'], function (Api) {
              self.Api = Api;
              getForms();
            });
          }
          var req = window.require(config(), load);
        });
      }

      function getForms () {
        app_require(['forms'], function (config) {
          function load () {
            req(['Forms'], function (Forms) {
              self.Forms = Forms;
              getRouter();
            });
          }
          var req = window.require(config(), load);
        });
      }

      function getRouter () {
        app_require(['Router'], function (Router) {
          self.set('Router', new Router());
          loadPages();
        });
      }

      function loadPages () {
        self.get('Sitemap').add(config.pages, {parse:true});
        getBody();
      }

      function getBody () {
        app_require(['BodyView'], function (BodyView) {
          self.start();
        });
      }

      app_require(['Sitemap'], function (Sitemap) {
        self.set('Sitemap', Sitemap);
        registerPartials();
      });

      app_require(['Preloader']);
    },

    start : function () {

      this.set({
        status : 'ready',
        message : 'Enjoy'
      });

      var initialPage;
      var hash = window.location.hash;
      if (hash) {
        initialPage = hash;
      } else {
        initialPage = '!/';
      }


      if (Responsiveness.isMobile()) {
        Backbone.history.start();
        this.get('Router').navigate(initialPage, {trigger : true});
      } else {
        this.listenTo(this, 'change:status', function (app, prop) {
          if (prop === 'intro-complete') {
            Backbone.history.start();
            this.get('Router').navigate(initialPage, {trigger : true});
          }
        }, this);
      }

      window.App = this; // remove this reference for live
    }
  });

  return new App();

});

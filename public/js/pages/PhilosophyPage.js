
define([
  'App',
  'require',
  'handlebars',
  'Page'
], function (App, app_require, handlebars, Page) {

  "use strict";

  var PhilosophyPage = Page.extend({

    events : {
      'click .phil-navigate' : 'handler'
    },

    handler : function (e) {
      e.preventDefault();
      App.get('Router').navigate('!/philosophy/' + $(e.target).data('route'), {trigger : false});
      this.loadPartial($(e.target).data('route'));
    },

    postInitialize : function (options) {
      if(options.identifier) {
        this.identifier = options.identifier;
      }
    },

    setElements : function () {
      this.$philosophyPartial = this.$el.find('.philosophy-partials');
    },

    postRender : function () {
      if(this.identifier) {
        this.directRoute = true;
        this.loadPartial(this.identifier);
      }
    },

    loadPartial : function (route) {
      var self = this;
      app_require(['text!/templates/page/' + route + '.tpl'], function (template) {
        self.renderPartial(template);
      })
    },

    renderPartial : function (template) {
      this.$philosophyPartial.html(template);
      var scrollTop = this.$philosophyPartial.offset().top - 60;
      $('html, body').animate({
        scrollTop: scrollTop
      }, 350);
    }
  });

  return PhilosophyPage;

});


define([
  'App',
  'HeaderView',
  'SidebarView',
  'MainMenuView',
  'ModalView',
  'WOW',
  'handlebars',
  'text!js/display/body/templates/body.tpl'
], function (App, HeaderView, SidebarView, MainMenuView, ModalView, WOW, handlebars, template) {

  "use strict";

  var Body = Backbone.View.extend({

    el : 'body',

    initialize : function () {

      var self = this;

      new window.WOW().init();

      this.listenTo(App, 'change:status', function (app, prop) {
        if(prop === 'intro-complete') {
          this.$el.removeClass('intro');
        }
      }, this);

      App.on('sidebar:toggle', function () {
        self.toggleSidebar();
      });

      this.render();
      this.renderPageComponents();

    },

    /* Utility */
    toggleClass : function (att, cls) {
      this.$el[att ? 'addClass' : 'removeClass'](cls);
    },

    setElements : function () {
      this.$headerView = this.$el.find('#primary-header');
      this.$sidebarView = this.$el.find('#primary-sidebar');
      this.$mainMenuView = this.$el.find('#main-menu');
      this.$modal = this.$el.find('#modal');
    },

    renderPageComponents : function () {

      this.setElements();

      new ModalView({
        el : this.$modal
      });

      new HeaderView({
        el : this.$headerView
      });

      new SidebarView({
        el : this.$sidebarView
      });

      new MainMenuView({
        el : this.$mainMenuView
      });

    },

    toggleSidebar : function () {
      var cls = 'sidebar-open';
      this.$el[this.$el.hasClass(cls) ? 'removeClass' : 'addClass'](cls);
    },

    render : function () {
      var compiled = handlebars.compile(template);
      this.$el.find('.app').html(compiled);
      return this;
    }
  });

  return new Body();

});

define([
  'Backbone',
  'App',
  'js/display/mainmenu/MainMenuNavigationView',
  'js/display/mainmenu/MainMenuParallaxView',
  'js/display/mainmenu/MainMenuCookieView',
  'Responsiveness',
  'Preloader'
], function (Backbone, App, MainMenuNavigationView, MainMenuParallaxView, MainMenuCookieView, Responsiveness, Preloader) {

  "use strict";

  var MainMenuView = Backbone.View.extend({

    events : {
      'click a' : 'handler'
    },

    mainMenuParallaxView : undefined,
    mainMenuNavigationView : undefined,

    initialize: function () {
      this.mainMenuNavigationView = new MainMenuNavigationView();
      this.mainMenuCookieView = new MainMenuCookieView({$el: this.$el});

      $(document.body).addClass('no-parallax');

      this.startListening();
      this.render();
    },

    handler : function (e) {
      if(e.target.href.indexOf(window.location.hash) !== -1) {
        $('html, body').scrollTop($('#app-content').offset().top);
      }
    },

    startListening : function () {
      this.listenTo(Responsiveness, 'change', this.setWorldClass.bind(this));
      return this;
    },

    render: function () {
      if (this.mainMenuParallaxView) {
        this.$el.append(this.mainMenuParallaxView.el);
      } else {
        window.setTimeout(function () { App.set('status', 'intro-complete'); }, 1);
      }
      this.$el.append(this.mainMenuNavigationView.el);
      this.setWorldClass();
      this.$el.append(this.mainMenuCookieView.render().$el);

      Preloader.loadImages('product');

      return this;
    },

    setWorldClass : function () {
      // @TODO: Move this to mainMenuNavigationView
      // @TODO: Namespace class name
      if (Responsiveness.isDesktop()) {
        this.$el.addClass('world');
      } else {
        this.$el.removeClass('world');
      }
      return this;
    }

  });

  return MainMenuView;

});

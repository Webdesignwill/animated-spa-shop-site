define([
  'App',
  'handlebars',
  'text!js/display/mainmenu/templates/parallax.tpl'
], function (App, handlebars, template) {
  "use strict";

  var MainMenuParallaxView = Backbone.View.extend({

    className : 'main-menu-parallax',

    initialize: function (options) {

      function onAnimationEnd() {

        function onPageOverAnimationEnd() {
          var parent = this.$el.parent();
          App.set('status', 'intro-complete');
          this.stopListening();
          this.$el.off();
          $('.main-menu-navigation').css('transform', 'translate3d(0, -10%, 0)');
          //this.$el.remove();
          parent.css('overflow', 'hidden');
          options.cookieView.$el.removeClass('hidden');
        }

        $('.main-menu-navigation').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', onPageOverAnimationEnd.bind(this));


        $('.main-menu-navigation').addClass('move-up2');
        this.$el.addClass('move-up');
        this.$el.css('overflow', 'hidden');
        $('.intro-logo').css('transition', 'transform 2.5s ease-out 1s');
        $('.intro-logo-text').css('transition', 'transform 2.5s ease-out 1s, opacity 1s linear');
        $('.intro-logo').css('transform', 'translate3d(0%, 150%, 500px)');
        $('.intro-logo-text').css('transform', 'translate3d(0%, 164%, 498px)');
      }

      options.cookieView.$el.addClass('hidden');
      $('.main-menu').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', onAnimationEnd.bind(this));

      this.render();
    },

    render: function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl({});

      this.$el.html(compiled);

      return this;
    },

  });

  return MainMenuParallaxView;

});

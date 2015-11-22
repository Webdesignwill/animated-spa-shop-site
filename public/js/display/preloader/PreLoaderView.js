
define([
  'App',
  'Responsiveness',
  'Preloader'
], function (App, Responsiveness, Preloader) {

  "use strict";

  var PreLoaderView = Backbone.View.extend({

    el : $('.preloader'),

    initialize : function () {
      var self = this;
      this.ready = false;

      var timeoutLength = 3000;

      function clearPreloader () {
        TweenLite.to(self.el, 0.7, {
          opacity : 0,
          onComplete : function () {
            self.stopListening(); self.$el.off(); self.$el.remove();
          }
        });
      }

      function testClearPreloader () {
        if(self.ready) {
          clearInterval(self.timer);
          clearPreloader();
        }
      }

      setTimeout(function () {
        self.ready = true;
      }, timeoutLength);

      if (Responsiveness.isMobile()) {
        self.stopListening(); self.$el.off(); self.$el.remove();
        return;
      }

      $.when(Preloader.loadImages('valley')).then(function () {
        self.timer = setInterval(function () {
          testClearPreloader();
        }, 200);
      });
    }

  });

  return PreLoaderView;

});
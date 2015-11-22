define([
  'handlebars',
  'text!js/display/audio/templates/player.tpl'
], function (handlebars, template) {

  "use strict";

  var AudioModalView = Backbone.View.extend({

    events : {
      'click .close' : 'close'
    },

    initialize : function (options) {
      this.options = options;
      this.render().setElements().show();
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl({src : this.options.src});
      this.$el.html(compiled);
      return this;
    },

    setElements : function () {
      this.$audio = this.$('audio');
      return this;
    },

    play: function () {
      this.$audio.each(function () {
        this.play();
      });
      return this;
    },

    stop : function () {
      this.$audio.each(function () {
        this.pause();
        this.currentTime = 0;
      });
      return this;
    },

    show : function () {
      $('body').addClass('audio-open');
      this.play();
      return this;
    },

    close : function () {
      this.stop();
      $('body').removeClass('audio-open');
      return this;
    },

    remove : function () {
      this.close();
      Backbone.View.prototype.remove.call(this);
    }
  });

  return AudioModalView;

});

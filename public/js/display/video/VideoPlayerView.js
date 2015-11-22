
define([
  'App',
  'handlebars',
  'text!js/display/video/templates/video.tpl'
], function (App, handlebars, template) {

  "use strict";

  var VideoPlayerView = Backbone.View.extend({

    initialize : function (options) {
      this.options = options.options;
      this.render();
    },

    render : function () {

      var renderObject = {
        src : this.options.file
      };

      var tpl = handlebars.compile(template);
      var compiled = tpl(renderObject);

      this.$el.html(compiled);

      return this;
    },

    close : function (e) {
      this.stopListening();
      this.$el.off();
      this.$el.empty();
    }

  });

  return VideoPlayerView;

});

define([
  'Backbone'
  ], function (Backbone) {

  var View = Backbone.View.extend({

    $window : undefined,
    $body : undefined,
    env : undefined,

    initialize: function () {
      this.setElements();
      this.startListening();
      this.setEnvironment();
    },

    setElements : function () {
      this.$window = $(window);
      this.$body = $('body');
    },

    startListening : function () {
      this.$window.resize(this.setEnvironment.bind(this));
    },

    onWindowResize : function (event) {
      this.trigger('change');
    },

    isMobile : function () {
      return this.env === 'xs';
    },

    isDesktop : function () {
      return !this.isMobile();
    },

    isTouch : function () {
      return 'ontouchstart' in window;
    },

    // @TODO: Use Backbone model
    setEnvironment : function () {

      var env = this.getBootstrapEnvironment();

      if (this.env !== env) {
        this.env = env;
        this.trigger('change');
      }
    },

    // @LINK : http://stackoverflow.com/questions/14441456/how-to-detect-which-device-view-youre-on-using-twitter-bootstrap-api
    getBootstrapEnvironment : function () {

      var envs = ['xs', 'sm', 'md', 'lg'];

      // @TODO : Maybe at zero height and width to divs
      var $el = $('<div>');
      $el.appendTo(this.$body);

      for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        $el.addClass('hidden-' + env);
        if ($el.is(':hidden')) {
            $el.remove();
            return env;
        }
      }
    }
  });

  return new View();
});

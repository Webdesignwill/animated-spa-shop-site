
define([
  'App',
  'ArticlePage',
  'BakerMillerPinkCanvas',
  'Responsiveness',
], function (App, ArticlePage, bakerMillerPinkCanvas, Responsiveness) {

  "use strict";

  var ExperimentPage = ArticlePage.extend({

    timeout: undefined,

    events : {
      'click .open-article' : 'open',
      'click .play-video' : 'handler'
    },

    handler : function (e) {
      e.preventDefault(e);
      if (Responsiveness.isMobile()) {
        window.location = $(e.target).data('file');
      } else {
        App.trigger('modal:open', {
          size : 'large',
          view : 'VideoPlayerView',
          file : $(e.target).data('file')
        });
      }
    },

    setElements : function () {
      ArticlePage.prototype.setElements.call(this);
      this.$articleHeaderContainer = this.$articleHeader.find('.container');
      this.$articleHeaderTextContainer = this.$articleHeaderContainer.find('.header-text-container');
      this.$canvas = this.$('canvas');
    },

    postRender : function () {

      if (Responsiveness.isDesktop()) {
        var height = this.$window.height();
        height -= this.headerHeight;

        this.$articleHeader.css('height', height);
        this.$canvas.height(height);
        this.$articleHeaderContainer.css('height', height);

        this.initCanvas();

      }
    },

    getRenderObject: function () {
      var port = window.location.port ? ':' + window.location.port : '';
      //var url = 'http://' + window.location.hostname + port + window.location.pathname + window.location.hash;
      var url = 'http://bit.ly/1LKHCjV';
      return {
        shareText: "Vollebak's Baker Miller Pink experiment hacks your central nervous system to help you relax pre and post sport ",
        shareURL: encodeURIComponent(url)
      };
    },

    initCanvas : function () {
      var $canvasBMP = this.$('#canvas-baker-miller-pink');
      if ($canvasBMP.length > 0 && $canvasBMP.is(':visible')) {
        bakerMillerPinkCanvas($canvasBMP[0], this.setBlur.bind(this));
        return;
      }
    },

    setBlur : function (px) {
      this.$articleHeaderTextContainer.css({
        '-webkit-filter': 'blur(' + px + 'px)',
        '-moz-filter': 'blur(' + px + 'px)',
        '-o-filter': 'blur(' + px + 'px)',
        '-ms-filter': 'blur(' + px + 'px)',
        filter: 'blur(' + px + 'px)'
      });
    }
  });

  return ExperimentPage;

});

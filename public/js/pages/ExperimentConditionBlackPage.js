
define([
  'App',
  'ExperimentPage',
  'ConditionBlackCanvas',
], function (App, ExperimentPage, ConditionBlackCanvas) {

  "use strict";

  var ExperimentConditionBlackPage = ExperimentPage.extend({

    // @TODO: Ugly to have scroll duration jQuery "slow" from Page.js hardcoded here
    scrollDuration: 600,
    canvasHidden: false,

    setResizeTimeout : function () {
      if (this.timeout) {
        window.clearTimeout(this.timeout);
        delete this.timeout;
      }
      this.timeout = window.setTimeout(this.redrawConditionBlack.bind(this), 500);
    },

    redrawConditionBlack: function () {
      this.$canvasCB.css('opacity', 0);
      this.canvasHidden = true;
      this.$headerTextContainer.removeClass('inverted');
    },

    getRenderObject: function () {
      var port = window.location.port ? ':' + window.location.port : '';
      //var url = 'http://' + window.location.hostname + port + window.location.pathname + window.location.hash;
      var url = 'http://bit.ly/1i0qqOK'
      return {
        shareText: "Vollebak's Condition Black experiment enhances athletes' sensory perception in life and death situations. Test it at",
        shareURL: encodeURIComponent(url)
      };
    },

    setElements : function () {
      ExperimentPage.prototype.setElements.call(this);
      this.$canvasCB = this.$('#canvas-condition-black');
      this.$headerTextContainer = this.$('.header-text-container');
    },

    initCanvas : function () {

      // canvas is hidden for mobile
      if (this.$canvasCB.is(':visible')) {
        var ratio = 1;
        var width = this.$window.width() / ratio;
        var height = (this.$window.height() / ratio) - this.headerHeight;
        this.$canvasCB.attr({
          width: width,
          height: height
        });
        this.$window.on('resize', this.setResizeTimeout.bind(this));

        window.setTimeout(function () {
          ConditionBlackCanvas.init(this.$canvasCB[0], this.invertTextColor.bind(this));
          window.setTimeout(this.invertTextColor.bind(this), 400);
        }.bind(this), this.scrollDuration);
      }
    },

    invertTextColor : function () {
      if (this.canvasHidden) {
        return;
      }
      this.$headerTextContainer.toggleClass('inverted');
    }
  });

  return ExperimentConditionBlackPage;

});

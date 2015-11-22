define([
  'App',
  'handlebars',
  'text!js/display/mainmenu/templates/mainmenu.tpl'
], function (App, handlebars, template) {
  "use strict";

  var MainMenuNavigationView = Backbone.View.extend({

    className: 'main-menu-navigation',

    props: {
      centerPosition: 0,
      background: null,
      backgroundMiddle: null,
      backgroundFront: null
    },

    events: {
      "mouseenter": "onMouseEnter",
      "mousemove": "onMouseMove"
    },

    initialize: function () {
      if ('ontouchstart' in window ) {
        this.undelegateEvents();
      }
      this.render();
      this.initMouseInteraction();
    },

    initMouseInteraction: function () {
        this.props.background = this.$el.find('[data-background]');
        this.props.backgroundMiddle = this.$el.find('[data-background-middle]');
        this.props.backgroundFront = this.$el.find('[data-background-front]');
    },

    moveBackground: function moveBackground(element, rotationDegree, xTranslation) {
      element.css('transform', 'rotate(' + rotationDegree + 'deg) translate3d(' + xTranslation + '% ,0,0)');
      element.css('-ms-transform', 'rotate(' + rotationDegree + 'deg) translate3d(' + xTranslation + '% ,0,0)');
      element.css('-webkit-transform', 'rotate(' + rotationDegree + 'deg) translate3d(' + xTranslation + '% ,0,0)');
    },

    onMouseEnter: function onMouseEnter() {
      this.centerPosition = this.$el.width() / 2;

      if (this.props.background && this.props.backgroundFront && this.props.backgroundMiddle) {

        this.moveBackground(this.props.background, 0, 0);
        this.moveBackground(this.props.backgroundMiddle, 0, 0);
        this.moveBackground(this.props.backgroundFront, 0, 0);
      }
    },

    onMouseMove: function onMouseMove(event) {
      if (this.props.background && this.props.backgroundFront && this.props.backgroundMiddle) {

        var offset = event.clientX - this.centerPosition;

        var rotationDegree = (offset / 200) * -0.6;
        var xTranslation = (offset / 100) * -1.2;

        // here we are setting a the ranges for the animation
        var rotationRange = 1.6;
        rotationDegree = rotationDegree > rotationRange ? rotationRange : rotationDegree;
        rotationDegree = rotationDegree < -rotationRange ? -rotationRange : rotationDegree;

        var xTranslationRange = 6.2;
        xTranslation = xTranslation > xTranslationRange ? xTranslationRange : xTranslation;
        xTranslation = xTranslation < -xTranslationRange ? -xTranslationRange : xTranslation;

        var originalxTranslation = xTranslation;

        this.moveBackground(this.props.background, rotationDegree, originalxTranslation);
        this.moveBackground(this.props.backgroundMiddle, rotationDegree, originalxTranslation * 1.3);
        this.moveBackground(this.props.backgroundFront, rotationDegree, originalxTranslation * 1.7);
      }
    },

    render: function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl({});

      this.$el.html(compiled);

      this.initMouseInteraction();

      return this;
    },

  });

  return MainMenuNavigationView;

});

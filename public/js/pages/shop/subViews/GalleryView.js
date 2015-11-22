
define([
  'App',
  'Backbone',
  'Responsiveness'
], function (App, Backbone, Responsiveness) {

  "use strict";

  var GalleryView = Backbone.View.extend({

    images : [],
    mobileImages : [],

    index: 0,

    events : {
      'click button.gallery-button-prev' : 'onClickButtonPrev',
      'click button.gallery-button-next' : 'onClickButtonNext'
    },

    initialize: function (options) {

      this.images = options.images || [];
      this.mobileImages = options.mobileImages || [];

      this.startListening();
      this.setElements();
      this.preloadImages();
      this.setImages();
    },

    startListening : function () {
      Responsiveness.on('change', function () {
        this.preloadImages();
        this.setImages();
      }.bind(this));
    },

    setElements : function () {
      this.$gallery = this.$('#shop-gallery');
    },

    setImages : function () {
      this.setIndex(this.index);
      this.renderImage();
    },

    getImages : function () {
      if (Responsiveness.isMobile()) {
        return this.mobileImages;
      }
      return this.images;
    },

    preloadImages : function () {
      this.getImages().forEach(function (imageUrl) {
        var $div = $('<div>', {
          css : {
            backgroundImage: 'url("' + imageUrl + '")',
            display: 'none'
          }
        });
        this.$el.append($div);
      }.bind(this));
    },

    onClickButtonPrev : function (event) {
      this.setIndex(this.index - 1);
      this.renderImage();
    },

    onClickButtonNext : function (event) {
      this.setIndex(this.index + 1);
      this.renderImage();
    },

    setIndex : function (index) {

      if (index < 0) {
        index = this.getImages().length - 1;
      }
      if (index >= this.getImages().length) {
        index = 0;
      }
      this.index = index;

      return this;
    },

    renderImage: function () {
      var image = this.getImages()[this.index];
      var imageUrl = 'url("' + image + '")';
      this.$el.css('background-image', imageUrl);
      this.$gallery.css('background-image', imageUrl);
      return this;
    }

  });

  return GalleryView;
});

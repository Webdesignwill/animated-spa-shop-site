
define([
  'App',
  'json!js/config.json'
], function (App, config) {

  "use strict";

  var Preloader = function () {

    var $imgContainer = $('<span />').css('display', 'none');

    function getImage (src) {
      var image,
            deferred = $.Deferred();

      image = new Image();
      image.src = src;

      image.onload = function () {
        deferred.resolve();
        $imgContainer.append(image);
      };

      return deferred.promise();
    }

    function loadImages (name) {

      var deferreds = [],
            deferred = $.Deferred();

      var images =  _.isArray(config.images[name]) ? config.images[name] : [];
      for(var i = 0; i < images.length; i++) {
        deferreds.push(getImage(images[i]));
      }

      $.when.apply($, deferreds).then(function () {
        deferred.resolve();
      });

      return deferred.promise();

    }

    return {
      loadImages : loadImages
    };

  };

  return new Preloader();

});
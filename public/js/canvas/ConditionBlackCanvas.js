define([
  'paper',
  'ConditionBlackCanvasBackground',
  'ConditionBlackCanvasAsset',
  'json!js/canvas/ConditionBlackCanvasImages.json',
  ], function (paper, Background, Asset, images) {

  return {

    scope: {},

    canvas: undefined,

    imageDir: '/js/canvas/images/',

    width: undefined,
    height: undefined,

    background: undefined,
    assets: [],
    animate: false,

    onFrame: function (event) {

      var num = 20, i = 0;

      if (!this.animate) {
        return;
      }
      if (this.background.isAnimating) {
        this.background.animate();
      }

      this.assets.forEach(function (asset) {
        asset.animate();
      });
    },

    onMouseMove: function (event) {

      var x = event.tool._point.x;
      var y = event.tool._point.y;
      var treshold = 100;
      var d = 2;

      this.assets.forEach(function (asset) {
        var assetX = asset.raster.position._x;
        var assetY = asset.raster.position._y;

        if (Math.abs(x - assetX) < treshold && Math.abs(y - assetY) < treshold) {
          asset.startAnimationMagnetic({x: x, y: y});
        }
      });
    },

    invert: function () {
      this.parentInvert();
      this.background.invert();
      this.assets.forEach(function (asset) {
        asset.invert();
      });
    },

    draw: function (canvas, width, height) {

      delete this.background;
      this.assets = [];

      var ratio = window.devicePixelRatio || 1;
      if (width && height) {
        this.width = width / ratio;
        this.height = height / ratio;
      } else {
        this.width = canvas.width / ratio;
        this.height = canvas.height / ratio;
      }

      this.background = new Background(this.scope, this.width, this.height);

      images.forEach(function (imageFilename) {
        var asset = new Asset(this.scope, this.width, this.height, this.imageDir, imageFilename, this.invert.bind(this));
        this.assets.push(asset);
      }.bind(this));

      this.animate = true;
    },

    init : function (canvas, parentInvert) {

      this.canvas = canvas;
      this.parentInvert = parentInvert;

      paper.install(this.scope);
      paper.setup('canvas-condition-black');

      this.scope.view.onFrame = this.onFrame.bind(this);
      var tool = new this.scope.Tool();
      tool.onMouseMove = this.onMouseMove.bind(this);

      this.draw(canvas);
    }
  };
});

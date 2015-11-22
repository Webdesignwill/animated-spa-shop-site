define([], function () {

  var Asset = function (scope, width, height, imageDir, imageFilename, invert) {
    this.raster = undefined;
    this.rasterGrayScale = undefined;
    this.inverted = false;
    this.scope = scope;
    this.width = width;
    this.height = height;
    this.imageDir = imageDir;
    this.imageFilename = imageFilename;
    this.invertProject = invert;
    this.initDraw();
  };
  Asset.prototype.initDraw = function () {

    var h = this.height / 4;

    var position = new this.scope.Point(this.width / 2, this.height / 2);
    var distance = 1.2 * (h + Math.random() * h);
    var distanceX = distance * this.width / this.height;
    var angle = Math.random() * Math.PI * 2;
    var x = Math.sin(angle) * distanceX;
    var y = Math.cos(angle) * distance;
    var diff = 0.8;
    this.destination = position.add(new this.scope.Point(x, y));
    this.destinationOrig = {
      x: this.destination.x,
      y: this.destination.y
    };

    this.raster = new this.scope.Raster({
      position: position.add(new this.scope.Point(x * diff, y * diff)),
      opacity: 0
    });

    this.raster.on('load', function () {
      this.generateGrayScale();
      this.startAnimationIntro();
    }.bind(this));
    this.raster.source = this.imageDir + this.imageFilename;
  };
  Asset.prototype.generateGrayScale = function () {

    this.rasterGrayScale = new this.scope.Raster({
      position: this.raster.position
    });
    this.rasterGrayScale.opacity = 0;
    this.rasterGrayScale.source = this.imageDir + 'gray/' + this.imageFilename;
    this.rasterGrayScale.on('load', function () {
      this.rasterGrayScale.onMouseEnter = this.invertProject;
      this.rasterGrayScale.onMouseLeave = this.invertProject;
    }.bind(this));
  };
  Asset.prototype.startAnimationIntro = function () {
    this.animateSpeedDivision = 8;
    this.isAnimating = true;
  };
  Asset.prototype.startAnimationMagnetic = function (destination) {

    if (this.isAnimating || this.lastAnimation) return;
    this.animateSpeedDivision = 50;
    this.lastAnimation = 'magnetic';
    this.destination = new this.scope.Point(destination.x, destination.y);
    this.isAnimating = true;
  };
  Asset.prototype.startAnimationMagneticReturn = function () {

    if (this.isAnimating || this.lastAnimation) return;
    this.animateSpeedDivision = 50;
    this.lastAnimation = 'magneticReturn';
    this.destination = new this.scope.Point(this.destinationOrig.x, this.destinationOrig.y);
    this.isAnimating = true;
  };
  Asset.prototype.stopAnimating = function () {

    this.isAnimating = false;

    var lastAnimation = this.lastAnimation;
    delete this.lastAnimation;
    if (lastAnimation === 'magnetic') {
      this.startAnimationMagneticReturn();
    }
  };
  Asset.prototype.animate = function () {

    if (!this.isAnimating) return;
    if (!this.raster) return;
    if (!this.rasterGrayScale) return;

    this.raster.opacity = 1;

    var vector = this.destination.subtract(this.raster.position);
    vector = vector.divide(this.animateSpeedDivision);

    this.raster.position = this.raster.position.add(vector);
    this.rasterGrayScale.position = this.raster.position;

    if (vector.length < 1) {
      this.stopAnimating();
    }
  };
  Asset.prototype.invert = function () {

    this.inverted = !this.inverted;

    if (this.inverted) {
      this.raster.opacity = 0;
      this.rasterGrayScale.opacity = 1;
    } else {
      this.raster.opacity = 1;
      this.rasterGrayScale.opacity = 0;
    }
  };

  return Asset;
});


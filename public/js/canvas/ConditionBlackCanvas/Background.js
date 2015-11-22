define([], function () {

  var Background = function (scope, width, height) {
    this.scope = scope;
    this.width = width;
    this.height = height;
    this.inverted = false;
    this.drawPath();
    this.path.opacity = 0;
    this.setFillColor();
    this.isAnimating = true;
  };
  Background.prototype.drawPath = function () {
    this.path = new this.scope.Path.Rectangle(new this.scope.Point(0, 0), new this.scope.Size(this.width, this.height));
  };
  Background.prototype.setFillColor = function () {
    var color0 = this.inverted ? 'black' : 'white';
    var color1 = this.inverted ? 'white' : 'black';

    this.path.fillColor = {
        gradient: {
            stops: [[color0, 0.2], [color1, 0.65]],
            radial: true
        },
        origin: this.path.position,
        destination: this.path.bounds.rightCenter
    };
  };
  Background.prototype.animate = function () {
    this.path.opacity += 0.05;
    if (this.path.opacity >= 1) {
      this.isAnimating = false;
    }
  };
  Background.prototype.invert = function () {
    this.inverted = !this.inverted;
    this.setFillColor();
  };

  return Background;
});

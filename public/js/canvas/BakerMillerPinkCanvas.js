define(['perlin'], function () {

  return function (canvas, setBlur) {

    var $window = $(window);

    var ctx = canvas.getContext('2d');

    var cWidth;
    var cHeight;
    var image;
    var data;
    var height;

    function init () {
      // Cache width and height values for the canvas.
      cWidth = canvas.width;
      cHeight = canvas.height;
      image = ctx.createImageData(cWidth, cHeight);
      data = image.data;
      alpha = 50;
      height = 0;
    }

    window.addEventListener('mousemove', function (event) {
      var w = $window.width();
      alpha = 120 - 80 * (Math.abs(event.clientX - (w / 2)) / (w / 2));
      setBlur(4 - ((alpha - 40) / 20));
    });
    window.addEventListener('resize', function (event) {
      window.setTimeout(init, 1);
    });

    init();

    function colorFromValue (start, value) {
      return start + ((255 - start) / 255) * value;
    }

    function drawFrame() {
      var start = Date.now();

      var max = -Infinity, min = Infinity;
      var noisefn = noise.perlin3;

      for (var x = 0; x < cWidth; x++) {
        for (var y = 0; y < cHeight; y++) {
          var value = noisefn(x / 50, y / 50, height);

          if (max < value) max = value;
          if (min > value) min = value;

          value = (1 + value) * 1.1 * 128;

          var cell = (x + y * cWidth) * 4;
          data[cell] = colorFromValue(243, value);
          data[cell + 1] = colorFromValue(139, value);
          data[cell + 2] = colorFromValue(170, value);
          data[cell + 3] = alpha; // alpha.
        }
      }

      var end = Date.now();

      ctx.putImageData(image, 0, 0);

      height += 0.05;
      requestAnimationFrame(drawFrame);
    }

    //requestAnimationFrame(drawFrame);
  };
});


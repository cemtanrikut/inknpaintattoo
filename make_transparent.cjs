const Jimp = require('jimp');

Jimp.read('public/logo.png')
  .then(image => {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      const alpha = this.bitmap.data[idx + 3];
      
      // If pixel is very close to white and opaque, make it fully transparent
      if (red > 240 && green > 240 && blue > 240 && alpha > 100) {
        this.bitmap.data[idx + 3] = 0;
      }
    });
    return image.write('public/logo.png');
  })
  .catch(err => {
    console.error(err);
  });

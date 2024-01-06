export const getCroppedImg = (imageSrc, pixelCrop, rotation = 0) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const width = pixelCrop.width;
      const height = pixelCrop.height;

      if (rotation === 90 || rotation === 270) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      if (rotation > 0) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(image, -height / 2, -width / 2, height, width);
      } else {
        ctx.drawImage(image, pixelCrop.x, pixelCrop.y, width, height, 0, 0, width, height);
      }

      resolve(canvas.toDataURL());
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};

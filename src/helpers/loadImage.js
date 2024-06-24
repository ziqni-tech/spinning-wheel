export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(this);
    };
    img.onerror = function () {
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}
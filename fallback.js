/* global HTMLImageElement, document */
module.exports = function () {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Dynamically import the LazySizes library
    const script = document.createElement('script');
    script.src = '{{lazyloadLib}}';
    document.body.appendChild(script);
  }
}

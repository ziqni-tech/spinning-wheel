import { loadImage } from './loadImage.js';

export async function createArrowImage(svg, circleRadius, centerX, centerY, imageUrl) {
  const imageSize = circleRadius / 2.5;

  const arrowGroup = svg.append('g')
    .attr('class', 'pointer-arrow-group')
    .attr('transform', `translate(${ centerX - imageSize / 2 }, ${ centerY - circleRadius - imageSize / 2 - 10 })`);

  const arrowImage = await loadImage(imageUrl);

  arrowGroup
    .append('image')
    .attr('class', 'arrow-img')
    .attr('xlink:href', arrowImage.src)
    .attr('width', imageSize)
    .attr('height', imageSize);
}
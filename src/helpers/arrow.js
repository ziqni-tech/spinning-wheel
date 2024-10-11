import { loadImage } from './loadImage.js';

export async function createArrowImage(svg, circleRadius, centerX, centerY, imageUrl, isWheelWithoutBorder) {
  const imageSize = circleRadius / 3;
  const adjustment = isWheelWithoutBorder ? 25 : 10;

  const arrowGroup = svg.append('g')
    .attr('class', 'pointer-arrow-group')
    .attr('transform', `translate(${ centerX - imageSize / 2 }, ${ centerY - circleRadius - imageSize / 2 - adjustment })`);

  const arrowImage = await loadImage(imageUrl);

  arrowGroup
    .append('image')
    .attr('class', 'arrow-img')
    .attr('xlink:href', arrowImage.src)
    .attr('width', imageSize)
    .attr('height', imageSize);
}

export function createArrowPointer(svg, circleRadius, centerX, centerY, isWheelWithoutBorder) {
  const width = circleRadius / 2.5;
  const height = circleRadius / 2.5;
  const adjustment = isWheelWithoutBorder ? 15 : 10;

  const arrowGroup = svg.append('g')
      .attr('class', 'pointer-arrow-group')
      .attr('transform', `translate(${centerX - width / 2 + 5}, ${centerY - circleRadius - height / 2 - adjustment})`);

  arrowGroup
      .append('g')
      .attr('class', 'arrow-pointer')
      .append('svg')
      .attr('x', '0px')
      .attr('y', '0px')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', '0 0 69 52')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .append('g')
      .attr('clip-path', 'url(#clip0_199_35821)')
      .append('path')
      .attr('d', 'M50.7644 3.95196V1.44899H3.63867V4.00637L25.6557 41.8229C26.1241 42.7479 28.3727 42.7479 28.9348 41.8229L50.8581 3.95196H50.7644Z')
      .attr('fill', '#D98A36');

  arrowGroup
      .select('svg')
      .append('g')
      .append('path')
      .attr('class', 'arrow-pointer-path')
      .attr('d', 'M3.63867 1.23114L25.6557 39.9727C26.1241 40.8977 28.3727 40.8977 28.9348 39.9727L50.8581 1.23114C35.6804 0.197303 19.8469 0.251715 3.63867 1.23114Z')
      .attr('fill', 'black');

  arrowGroup
      .select('svg')
      .append('g')
      .append('path')
      .attr('d', 'M26.8736 39.9729L4.85663 1.23134H3.63867L25.6557 39.9729C26.0304 40.5714 27.061 40.7347 27.9042 40.5714C27.4358 40.4626 27.061 40.2994 26.8736 39.9729Z')
      .attr('fill', 'url(#paint0_linear_199_35821)');
}

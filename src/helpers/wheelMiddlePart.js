import { loadImage } from './loadImage.js';

export function createSections(wheel, pieData, useFill = true) {
  wheel
    .append('g')
    .selectAll('.path-section')
    .data(pieData)
    .enter()
    .append('path')
    .attr('class', 'path-section')
    .attr('id', (d) => `path-section-${ d.id }`)
    .attr('d', (d) => d.arc)
    .attr('fill', (d) => useFill ? d.fill : 'none')
    .attr('stroke', (d) => d.stroke)
    .attr('stroke-width', (d) => d.strokeWidth);
}

export const insertWheelImage = async (wheel, imageUrl, circleRadius, sectionsCount) => {
  const angleOffset = 360 / (2 * sectionsCount);
  const imageSize = circleRadius * 2;
  const image = await loadImage(imageUrl);

  wheel
    .insert('image', ':first-child') // Insert before other elements
    .attr('class', 'wheel-image')
    .attr('xlink:href', image.src)
    .attr('transform', `rotate(${ angleOffset })`)
    .attr('x', -imageSize / 2)
    .attr('y', -imageSize / 2)
    .attr('width', imageSize)
    .attr('height', imageSize);
};

import * as d3 from 'd3';
import { loadImage } from './loadImage.js';

const defaultWheelBackground = '#5E084B';

const outerCircleBordersGradientData = [
  { offset: '16%', color: '#F9DF7B' },
  { offset: '30.36%', color: '#B57E10' },
  { offset: '34.67%', color: '#B78113' },
  { offset: '38.98%', color: '#BE8C1F' },
  { offset: '43.29%', color: '#CB9D32' },
  { offset: '47.6%', color: '#DCB64E' },
  { offset: '51.19%', color: '#F2D570' },
  { offset: '52.63%', color: '#F9DF7B' },
  { offset: '53.35%', color: '#FFF3A6' },
  { offset: '58.38%', color: '#F9DF7B' },
  { offset: '76.34%', color: '#B57E10' },
  { offset: '84.24%', color: '#E5C25B' },
  { offset: '87.83%', color: '#F9DF7B' }
];

export async function createBorderImage(svg, radius, imageUrl) {
  const imageSize = radius * 2 + 50;

  const borderImageGroup = svg.append('g').attr('class', 'border-image-container');

  const image = await loadImage(imageUrl);

  borderImageGroup
    .append('image')
    .attr('class', 'border-image')
    .attr('transform', `translate(${ radius + 4 },${ radius + 4 })`)
    .attr('xlink:href', image.src)
    .attr('x', -imageSize / 2)
    .attr('y', -imageSize / 2)
    .attr('width', imageSize)
    .attr('height', imageSize);

  // Make sure the border image is behind other elements
  svg.node().insertBefore(borderImageGroup.node(), svg.node().firstChild);
}

export const createWheelBorder = (svg, radius, wheelSettings) => {

  const borderContainer = svg.append('g')
    .attr('class', 'border-container')
    .attr('transform', `translate(${ radius + 4 },${ radius + 4 })`);

  // const wheelSettings = props.wheelSettings;
  const wheelBackground = wheelSettings && wheelSettings.wheelBackground
    ? wheelSettings.wheelBackground
    : defaultWheelBackground;

  const gradient = d3.select('body')
    .append('svg')
    .attr('width', 0)
    .attr('height', 0);

  gradient.append('linearGradient')
    .attr('id', 'circle-borders-gradient')
    .attr('x1', '0%')
    .attr('x2', '100%')
    .selectAll('stop')
    .data(outerCircleBordersGradientData)
    .enter().append('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color);

  const wheelBordersColor = wheelSettings && wheelSettings.wheelBordersColor
    ? wheelSettings.wheelBordersColor
    : 'url(#circle-borders-gradient)';

  borderContainer
    .append('circle')
    .attr('class', 'outer-circle-border')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', radius + 15)
    .attr('fill', 'none')
    .attr('stroke-width', 30)
    .attr('stroke', wheelBordersColor);

  borderContainer
    .append('circle')
    .attr('class', 'outer-circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', radius + 15)
    .attr('fill', 'none')
    .attr('stroke-width', 20)
    .attr('stroke', wheelBackground);

  svg.node().insertBefore(borderContainer.node(), svg.node().firstChild);
};


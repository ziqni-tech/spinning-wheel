import { loadImage } from './loadImage.js';
import * as d3 from 'd3';

export async function createWheelImageButton(buttonContainer, centerX, centerY, circleRadius, imageUrl, isCardPreview) {
  const buttonImageGroup = buttonContainer
    .append('g')
    .attr('class', 'spin-button')

  const buttonSize = isCardPreview ? circleRadius / 4 : 80;
  // const buttonSize = 80;

  const image = await loadImage(imageUrl);

  const imageElement = buttonImageGroup
    .append('image')
    .attr('class', 'wheel-image-button')
    .attr('xlink:href', image.src)
    .attr('x', -buttonSize / 2)
    .attr('y', -buttonSize / 2)
    .attr('width', buttonSize)
    .attr('height', buttonSize);

}

export const wheelCenterButton = (buttonContainer, wheelSettings, circleRadius, isCardPreview) => {
  const stopsData = [
    { offset: '3.08%', color: '#F9DF7B' },
    { offset: '21.59%', color: '#B57E10' },
    { offset: '27.14%', color: '#B78113' },
    { offset: '32.69%', color: '#BE8C1F' },
    { offset: '38.24%', color: '#CB9D32' },
    { offset: '43.79%', color: '#DCB64E' },
    { offset: '48.42%', color: '#F2D570' },
    { offset: '50.27%', color: '#F9DF7B' },
    { offset: '51.19%', color: '#FFF3A6' },
    { offset: '57.67%', color: '#F9DF7B' },
    { offset: '80.8%', color: '#B57E10' },
    { offset: '90.98%', color: '#E5C25B' },
    { offset: '95.61%', color: '#F9DF7B' }
  ];

  const defaultSpinButtonBackground = '#5E084B';

  const buttonRadius = isCardPreview ? circleRadius / 8 : 40;
  // const buttonRadius = 40;

  const buttonText = wheelSettings && wheelSettings.buttonText
    ? wheelSettings.buttonText
    : '';

  const spinButtonBackground = wheelSettings && wheelSettings.spinButtonBackground
    ? wheelSettings.spinButtonBackground
    : defaultSpinButtonBackground;

  const spinButtonBorderColor = wheelSettings && wheelSettings.spinButtonBorderColor
    ? wheelSettings.spinButtonBorderColor
    : 'url(#stroke-gradient)';

  const gradient = buttonContainer.append('defs')
    .append('linearGradient')
    .attr('id', 'stroke-gradient')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%');

  gradient.selectAll('stop')
    .data(stopsData)
    .enter()
    .append('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color);

  const buttonRect = buttonContainer.append('rect')
    .attr('class', 'spin-button')
    .attr('x', -buttonRadius)
    .attr('y', -buttonRadius)
    .attr('width', buttonRadius * 2)
    .attr('height', buttonRadius * 2)
    .attr('rx', buttonRadius)
    .attr('ry', buttonRadius)
    .attr('fill', spinButtonBackground)
    .attr('stroke', spinButtonBorderColor)
    .attr('stroke-width', () => isCardPreview ? 1 : 4)
    .style('cursor', 'default');

  const imageForeignObject = buttonContainer.append('foreignObject')
    .attr('class', 'spin-button-image')
    .attr('x', -buttonRadius)
    .attr('y', -buttonRadius)
    .attr('width', buttonRadius * 2)
    .attr('height', buttonRadius * 2)
    .style('pointer-events', 'none');

  if (typeof wheelSettings.spinButtonBackgroundImage === 'string' && wheelSettings.spinButtonBackgroundImage !== '') {
    imageForeignObject.append('xhtml:div')
      .attr('class', 'background-image-container')
      .style('display', 'flex')
      .style('justify-content', 'center')
      .style('align-items', 'center')
      .style('width', buttonRadius * 2 + 'px')
      .style('height', buttonRadius * 2 + 'px')
      .style('pointer-events', 'none')
      .html(`<img src="${ wheelSettings.spinButtonBackgroundImage }" width="${ buttonRadius * 2 - 3 }" height="${ buttonRadius * 2 - 3 }" style="border-radius: 50%;"/>`);
  }

  const buttonTextForeignObject = buttonContainer.append('foreignObject')
    .attr('class', 'spin-button-text')
    .attr('x', -buttonRadius)
    .attr('y', -buttonRadius)
    .attr('width', buttonRadius * 2)
    .attr('height', buttonRadius * 2 + 3)
    .html((d, i) => {
      let content;
      let iconHTML = '';

      if (typeof wheelSettings.icon === 'string' && wheelSettings.icon !== '') {
        iconHTML = `<img src="${ wheelSettings.icon }" width="${ buttonRadius }" height="${ buttonRadius }"/>`;
      }

      if (typeof buttonText === 'string' && buttonText.trim() !== '') {
        if (iconHTML !== '') {
          content = `<div>${ iconHTML }</div><div>${ buttonText }</div>`;
        } else {
          content = buttonText;
        }
      } else {
        content = iconHTML;
      }

      if (typeof content === 'string' && content.includes('<p')) {
        content = content.replace(/<p/g, '<p style="margin: 0;"');
      }

      // Add style="margin-bottom: 0;" to tags <h1>, <h2>, <h3>, <h4>, <h5>, <h6>
      if (typeof content === 'string' && content.includes('<h')) {
        content = content.replace(/<h1/g, '<h1 style="margin: 0;"');
        content = content.replace(/<h2/g, '<h2 style="margin: 0;"');
        content = content.replace(/<h3/g, '<h3 style="margin: 0;"');
        content = content.replace(/<h4/g, '<h4 style="margin: 0;"');
        content = content.replace(/<h5/g, '<h5 style="margin: 0;"');
        content = content.replace(/<h6/g, '<h6 style="margin: 0;"');
      }

      const fontSize = isCardPreview ? '4px' : '10px';
      const lineHeight = isCardPreview ? '4px' : '12px';

      return `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: ${ buttonRadius * 2 }px; height: ${ buttonRadius * 2 }px; font-size: ${ fontSize }; line-height: ${ lineHeight };">${ content }</div>`;
    })
    .style('pointer-events', 'none')
    .style('cursor', 'default');

};



import * as d3 from 'd3';
import { tiles } from './helpers/tilesData.js';
import { wheelSettingsData } from './helpers/wheelSettings.js';
import { generatePieData } from './helpers/generatePieData.js';
import { createBorderImage, createWheelBorder } from './helpers/wheelBorders.js';
import { createSections, insertWheelImage } from './helpers/wheelMiddlePart.js';
import { createWheelImageButton, wheelCenterButton } from './helpers/wheelButton.js';
import { addTextElements } from './helpers/textElements.js';
import { createArrowImage, createArrowPointer } from './helpers/arrow.js';
import { getSectionFill } from './helpers/getSectionFill.js';

export async function createSpinnerWheel(
  containerId,
  tilesData = tiles,
  wheelSettings = wheelSettingsData,
  onSpinComplete,
  isCardPreview = false
) {

  const spinnerContainer = d3.select(containerId);
  const boundingRect = spinnerContainer.node().getBoundingClientRect();
  const screenWidth = boundingRect.width;
  const screenHeight = boundingRect.height;
  const minDimension = Math.min(screenWidth, screenHeight);
  const circleRadius = minDimension / 3.5;

  const iconUris = tilesData.map(tile => {
    const hasId = /\/_id\/[a-zA-Z0-9_-]+/.test(tile.iconLink);
    return hasId ? tile.iconLink : null;
  });

  function handleWindowResize() {
    window.location.reload();
  }

  window.addEventListener('resize', handleWindowResize);

  // Cleaning up SVG before adding new elements
  function clearSVG() {
    d3.select('#spinner-container').select('svg').remove();
  }

  // Calling the SVG cleanup function before adding new elements
  clearSVG();

  const containerWidth = boundingRect.width;
  const containerHeight = boundingRect.height;

  const svg = spinnerContainer
    .append('svg')
    .attr('viewBox', `0 0 ${ containerWidth } ${ containerHeight }`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('width', containerWidth)
    .attr('height', containerHeight);

  // Calculate the coordinates of the SVG center
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  const sectionsCount = tilesData.length;
  const sectionColors = ['#9694f5', '#50f5ff'];

  const degreesPerSection = 360 / sectionsCount;
  const startAngleFirstSection = -0.5 * degreesPerSection;

  const viewBoxCenterX = containerWidth / 2;
  const viewBoxCenterY = containerHeight / 2;

  const wheel = svg.append('g')
    .attr('class', 'wheel-group') // Assign a class to the wheel group
    .attr('transform', `translate(${ viewBoxCenterX }, ${ viewBoxCenterY }) rotate(${ startAngleFirstSection })`);

  const borderContainer = svg.append('g')
    .attr('class', 'border-container')
    .attr('transform', `translate(${ viewBoxCenterX },${ viewBoxCenterY })`);

  const buttonContainer = svg.append('g')
    .attr('class', 'button-container')
    .attr('transform', `translate(${ viewBoxCenterX },${ viewBoxCenterY })`);

  const middlePartImageUri = wheelSettings.wheelSettings.wheelImage;
  const borderImageUrl = wheelSettings.wheelSettings.wheelBorderImage;

  const pieData = generatePieData(
    circleRadius,
    tilesData.length,
    getSectionFill,
    svg,
    iconUris,
    tilesData,
    sectionColors,
    !!middlePartImageUri
  );

  // BORDER
  if (borderImageUrl) {
    await createBorderImage(svg, centerX, centerY, circleRadius, borderImageUrl);
  } else {
    createWheelBorder(svg, borderContainer, circleRadius, wheelSettings.wheelSettings);
  }

  // WHEEL SECTIONS
  if (middlePartImageUri) {
    createSections(wheel, pieData, false);
    await insertWheelImage(wheel, middlePartImageUri, circleRadius, tilesData.length);
  } else {
    createSections(wheel, pieData);
  }

  // TEXT ELEMENTS
  addTextElements(
    wheel,
    pieData,
    tilesData,
    circleRadius,
    getHeightFromHeader,
    getFontFamilyFromClass,
    getSvgTextAnchor,
    isCardPreview
  );

  // BUTTON
  const buttonImageUri = wheelSettings.wheelSettings.wheelButtonImage;

  if (buttonImageUri) {
    await createWheelImageButton(buttonContainer, centerX, centerY, circleRadius, buttonImageUri);
  } else {
    wheelCenterButton(buttonContainer, wheelSettings.wheelSettings, circleRadius, isCardPreview);
  }

  // ARROW
  const arrowImageUri = wheelSettings.wheelSettings.wheelArrowImage;

  if (arrowImageUri) {
    if (!isCardPreview) createArrowImage(svg, circleRadius, centerX, centerY, arrowImageUri);
  } else {
    if (!isCardPreview) createArrowPointer(svg, circleRadius, centerX, centerY);
  }

  const wheelGroup = spinnerContainer.select('.wheel-group');
  const spinButton = spinnerContainer.select('.spin-button');

  async function spinWheel(prizeSection) {
    const randomIndex = Math.floor(Math.random() * sectionsCount);
    const giftValue = prizeSection ? prizeSection : randomIndex + 1;
    const sliceWidth = 360 / sectionsCount;
    const currentAngle = 360 - sliceWidth * (giftValue - 0.5);
    const numberOfRotation = 360 * 5;
    const targetRotation = currentAngle + numberOfRotation;

    // Create Interpolation for Smooth Transition
    const interpolate = d3.interpolate(0, targetRotation);

    spinButton.on('click', null);

    // Start the spinning animation
    await wheelGroup
      .transition()
      .duration(7000) // You can adjust the duration as needed
      .ease(d3.easeBackOut.overshoot(0.3))
      .tween('rotation', () => (t) => {
        const rotationAngle = interpolate(t);

        // Apply rotation only to the wheel group
        wheelGroup.attr('transform', `translate(${ viewBoxCenterX },${ viewBoxCenterY }) rotate(${ rotationAngle })`);
      })
      .end();

    // Mark the wheel as stopped
    const sections = wheelGroup.selectAll('.path-section');
    sections
      .attr('fill', (d, i) => {
        const fill = middlePartImageUri ? 'none' : d.fill;
        return d.id !== giftValue ? 'rgba(0, 0, 0, 0.7)' : fill;
      })
      .attr('stroke-width', (d, i) => {
        return d.id === giftValue ? '5' : '0';
      })
      .attr('stroke', (d, i) => d.id === giftValue ? '#EE3EC8' : '#8D0C71');

    const texts = wheelGroup.selectAll('.section-text');

    texts
      .attr('filter', (d, i) => d.id !== giftValue ? 'blur(3px)' : 'none');

    // Bring the winning section to the front
    sections
      .filter((d, i) => i + 1 === giftValue)
      .raise();

    if (typeof onSpinComplete === 'function') {
      onSpinComplete({ isCompleted: true });
    }
  }

  const resetWheel = () => {
    const sections = wheelGroup.selectAll('.path-section');
    sections
      .attr('fill', (d) => {
        return middlePartImageUri ? 'none' : d.fill;
      })
      .attr('stroke-width', '0')
      .attr('stroke', 'none');

    const texts = wheelGroup.selectAll('.section-text');
    texts.attr('filter', 'none');

    // Reset the wheel rotation to its initial position
    wheelGroup.attr('transform', `translate(${viewBoxCenterX},${viewBoxCenterY}) rotate(${startAngleFirstSection})`);

  };

  function getFontFamilyFromClass(fontMatch) {
    const fontName = fontMatch[1];
    switch (fontName) {
      case 'arial':
        return 'Arial, sans-serif';
      case 'courier':
        return 'Courier New, Courier, monospace';
      case 'garamond':
        return 'Garamond, serif';
      case 'tahoma':
        return 'Tahoma, sans-serif';
      case 'times-new-roman':
        return 'Times New Roman, Times, serif';
      case 'verdana':
        return 'Verdana, sans-serif';
      default:
        return 'inherit';
    }
  }

  function getSvgTextAnchor(alignClass) {
    switch (alignClass) {
      case 'ql-align-center':
        return 'middle';
      case 'ql-align-right':
        return 'end';
      case 'ql-align-justify':
        return 'start';
      default:
        return 'start';
    }
  }

  function getHeightFromHeader(text) {
    const regex = /<h(\d)\b/g;
    const match = regex.exec(text);

    if (match) {
      const headerSize = parseInt(match[1]);

      let height = 10;
      switch (headerSize) {
        case 1:
          height = 40;
          break;
        case 2:
          height = 32;
          break;
        case 3:
          height = 28;
          break;
        case 4:
          height = 24;
          break;
        case 5:
          height = 20;
          break;
        case 6:
          height = 18;
          break;
      }
      return height * 1.5 + 'px';
    } else {
      return '22px';
    }
  }

  return { isCreated: true, spinWheel, resetWheel };
}

import './styles.css'; // import for build
import { tiles } from './helpers/tilesData.js';
import { wheelSettingsData } from './helpers/wheelSettings.js';
import { generatePieData } from './helpers/generatePieData.js';
import { createBorderImage, createWheelBorder } from './helpers/wheelBorders.js';
import { createSections, insertWheelImage } from './helpers/wheelMiddlePart.js';
import { createWheelImageButton, wheelCenterButton } from './helpers/wheelButton.js';
import { addTextElements } from './helpers/textElements.js';
import { createArrowImage } from './helpers/arrow.js';
import { getSectionFill } from './helpers/getSectionFill.js';
import { startSpinAnimations } from './helpers/startSpinAnimations.js';

export async function createSpinnerWheel(tilesData = tiles, wheelSettings = wheelSettingsData, prizeSection) {
  const spinnerContainer = d3.select('#spinner-container');

  const circleRadius = 125;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const minDimension = Math.min(screenWidth, screenHeight);

  const minX = -45;
  const minY = -15;
  const viewBoxWidth = circleRadius * 2 + 100;
  const viewBoxHeight = circleRadius * 2 + 30;

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

  // Create an SVG element to render the spinner
  const svg = spinnerContainer
      .append('svg')
      .attr('viewBox', `${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('width', minDimension)
      .attr('height', minDimension);

  // Calculate the coordinates of the SVG center
  const centerX = minX + (viewBoxWidth / 2);
  const centerY = minY + (viewBoxHeight / 2);

  const sectionsCount = tilesData.length;
  const sectionColors = ['#9694f5', '#50f5ff'];

  const degreesPerSection = 360 / sectionsCount;
  const startAngleFirstSection = -0.5 * degreesPerSection;

  const wheel = svg.append('g')
      .attr('class', 'wheel-group') // Assign a class to the wheel group
      .attr('transform', `translate(${circleRadius + 4},${circleRadius + 4}) rotate(${startAngleFirstSection})`);

  const pieData = generatePieData(circleRadius, tilesData.length, getSectionFill, svg, iconUris, tilesData, sectionColors);

  // BORDER
  const borderImageUrl = wheelSettings.wheelSettings.wheelBorderImage;

  if (borderImageUrl) {
    createBorderImage(svg, circleRadius, borderImageUrl);
  } else {
    createWheelBorder(svg, circleRadius, wheelSettings.wheelSettings);
  }

  // WHEEL SECTIONS
  const middlePartImageUri = wheelSettings.wheelSettings.wheelImage;

  if (middlePartImageUri) {
    createSections(wheel, pieData, false);
    insertWheelImage(wheel, middlePartImageUri, circleRadius, tilesData.length);
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
      getSvgTextAnchor
  );

  // BUTTON
  const buttonImageUri = wheelSettings.wheelSettings.wheelButtonImage;

  if (buttonImageUri) {
    createWheelImageButton(svg, circleRadius, buttonImageUri, spinWheel);
  } else {
    wheelCenterButton(svg, wheelSettings.wheelSettings, centerX, centerY, spinWheel);
  }

  // ARROW
  const arrowImageUri = wheelSettings.wheelSettings.wheelArrowImage
      ? wheelSettings.wheelSettings.wheelArrowImage
      : './images/arrow_img.png';

  createArrowImage(svg, circleRadius, centerX, centerY, arrowImageUri);


  const wheelGroup = d3.select('.wheel-group');
  const spinButton = d3.select('.spin-button');
  const spinButtonText = d3.select('.spin-button-text');
  const spinButtonImage = d3.select('.spin-button-image');
  const pointerArrowGroup = d3.select('.pointer-arrow-group');
  const borderContainer = d3.select('.border-container');

  async function spinWheel() {
    const randomIndex = Math.floor(Math.random() * sectionsCount);
    const giftValue = prizeSection ? prizeSection : randomIndex + 1;

    const sliceWidth = 360 / sectionsCount;
    const currentAngle = 360 - sliceWidth * (giftValue - 0.5);
    const numberOfRotation = 360 * 5;
    const targetRotation = currentAngle + numberOfRotation;

    // Create Interpolation for Smooth Transition
    const interpolate = d3.interpolate(0, targetRotation);

    spinButton.on('click', () => null);
    spinButtonText.on('click', () => null);
    spinButtonImage.on('click', () => null);

    // Start the spinning animation
    await wheelGroup
        .transition()
        .duration(7000) // You can adjust the duration as needed
        .ease(d3.easeBackOut.overshoot(0.3))
        .tween('rotation', () => (t) => {
          const rotationAngle = interpolate(t);

          // Apply rotation only to the wheel group
          wheelGroup.attr('transform', `translate(${ circleRadius + 4 },${ circleRadius + 4 }) rotate(${ rotationAngle })`);
        })
        .on('start', () => {
          // Add animation to move the wheel down and scale it up
          startSpinAnimations(
              wheelGroup,
              pointerArrowGroup,
              borderContainer,
              spinButton,
              spinButtonText,
              spinButtonImage,
              targetRotation,
              circleRadius,
              centerX,
              centerY,
              screenHeight,
              screenWidth,
              middlePartImageUri,
              giftValue
          );
        });

    setTimeout(() => {
      window.parent.postMessage({ message: 'spinWheelCompleted', giftValue }, '*');
    }, 5500)

  }

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
}

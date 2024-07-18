import * as d3 from 'd3';
// Animation for wheelGroup
function animateWheelGroup(wheelGroup, centerX, centerY, targetRotation, circleRadius, screenHeight) {
  wheelGroup
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / 6) }) rotate(${ targetRotation }) scale(1.8)`);
}

// Animation for pointerArrowGroup
function animatePointerArrowGroup(pointerArrowGroup, circleRadius, centerX, centerY) {
  const arrowImageSize = circleRadius / 2.5;
  pointerArrowGroup
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(150)
    .attr('transform', () => {
      const rotationAngle = -15;
      const radians = rotationAngle * Math.PI / 180;
      const xOffset = circleRadius * Math.sin(radians) / 2;

      return `translate(${ centerX - arrowImageSize / 2 + xOffset }, ${ centerY - circleRadius - arrowImageSize / 2 - 10 }) rotate(${ rotationAngle })`;
    });
}

// Animation for svg container
function animateSVGContainer(screenWidth) {
  d3.select('.svg-container')
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('width', screenWidth);
}

// Animation for borderContainer
function animateBorderContainer(borderContainer, centerX, centerY, circleRadius, screenHeight) {
  borderContainer
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / 6) }) scale(1.8)`);
}

function animateBorderImageContainer(circleRadius, centerX, centerY, screenHeight) {
  d3.select('.border-image-container')
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / 6) }) scale(1.8)`);
}

// Animation for pointerArrowGroup at the end
function animatePointerArrowGroupEnd(pointerArrowGroup, circleRadius, centerX, centerY, screenHeight, isPointerArrowImage) {
  const arrowImageSize = isPointerArrowImage ? circleRadius / 2.5 : circleRadius / 2.5;
  pointerArrowGroup
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', () => {
      const rotationAngle = 0;
      const newOffsetX = isPointerArrowImage
          ? centerX - (circleRadius * Math.sin(rotationAngle * Math.PI / 180)) - arrowImageSize
          : centerX - (circleRadius * Math.sin(rotationAngle * Math.PI / 180)) - arrowImageSize + 20;
      const newOffsetY = isPointerArrowImage
          ? centerY + (screenHeight / 6) - circleRadius * 1.8 - arrowImageSize / 2 - 56
          : centerY + (screenHeight / 6) - circleRadius * 1.8 - arrowImageSize / 2 - 66;

      return `translate(${ newOffsetX }, ${ newOffsetY }) rotate(${ rotationAngle }) scale(1.8)`;
    });
}

// Animation for spinButton
let isImageButton = false;

function animateSpinButton(spinButton, centerX, centerY, screenWidth, screenHeight, circleRadius) {
  const scaleFactor = 1.8;
  isImageButton = spinButton.select('.wheel-image-button').size() > 0;

  let buttonWidth, buttonHeight;

  if (isImageButton) {
    const imageElement = spinButton.select('.wheel-image-button');
    buttonWidth = +imageElement.attr('width') * scaleFactor;
    buttonHeight = +imageElement.attr('height') * scaleFactor;
  } else {
    const buttonBoundingBox = spinButton.node().getBoundingClientRect();
    buttonWidth = buttonBoundingBox.width * scaleFactor;
    buttonHeight = buttonBoundingBox.height * scaleFactor;
  }

  let newOffsetX, newOffsetY;

  if (screenWidth > screenHeight) {
    // Landscape orientation
//   newOffsetX = -centerX + circleRadius / 2 - (buttonWidth / 8);
//   newOffsetY = -centerY + circleRadius / 2 + (screenHeight / 6) - (buttonHeight / 2);
    newOffsetX = -centerX + circleRadius / 2 - buttonWidth / 2 / scaleFactor;
    newOffsetY = -centerY + screenHeight / 6 - buttonHeight / 2 / scaleFactor;
  } else {
    // Portrait orientation
//  newOffsetX = -centerX + circleRadius / 2 - (buttonWidth / 2);
//  newOffsetY = -centerY + circleRadius / 2 + (screenHeight / 6) - (buttonHeight / 4)
    newOffsetX = -centerX + circleRadius / 2 - buttonWidth / 2 / scaleFactor;
    newOffsetY = -centerY + screenHeight / 6 - buttonHeight / 4 / scaleFactor;
  }

  spinButton
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${newOffsetX}, ${newOffsetY}) scale(${scaleFactor})`);
}


function animateSpinButtonText(spinButtonText, centerX, centerY, screenWidth, screenHeight, circleRadius) {
  const textBoundingBox = spinButtonText.node().getBoundingClientRect();
  const textWidth = textBoundingBox.width ;
  const textHeight = textBoundingBox.height ;

  spinButtonText
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', () => {
      if (screenWidth > screenHeight) {
        const newOffsetX = -centerX + circleRadius / 2 - (textWidth / 8);
        const newOffsetY = -centerY + circleRadius / 2 + (screenHeight / 6) - (textHeight / 2);
        return `translate(${newOffsetX}, ${newOffsetY}) scale(1.8)`;
      } else {
        const newOffsetX = -centerX + circleRadius / 2 - (textWidth / 2);
        const newOffsetY = -centerY + circleRadius / 2 + (screenHeight / 6) - (textHeight / 4);
        return `translate(${newOffsetX}, ${newOffsetY}) scale(1.8)`;
      }
    });
}

function animateSpinButtonImage(spinButtonImage, centerX, centerY, screenWidth, screenHeight, circleRadius) {
  const imageBoundingBox = spinButtonImage.node().getBoundingClientRect();
  const imageWidth = imageBoundingBox.width ;
  const imageHeight = imageBoundingBox.height ;

  spinButtonImage
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', () => {
      if (screenWidth > screenHeight) {
        const newOffsetX = -centerX + circleRadius / 2 - (imageWidth / 8);
        const newOffsetY = -centerY + circleRadius / 2 + (screenHeight / 6) - (imageHeight / 2);
        return `translate(${newOffsetX}, ${newOffsetY}) scale(1.8)`;
      } else {
        const newOffsetX = -centerX + circleRadius / 2 - (imageWidth / 2);
        const newOffsetY = -centerY + circleRadius / 2 + (screenHeight / 6) - (imageHeight / 4);
        return `translate(${newOffsetX}, ${newOffsetY}) scale(1.8)`;
      }
    });
}

// Animation for wheel sections
function animateWheelSections(wheelGroup, giftValue, middlePartImageUri) {
  const sections = wheelGroup.selectAll('.path-section');
  sections
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4500)
    .attr('fill', (d, i) => {
      const fill = middlePartImageUri ? 'none' : d.fill;
      return i + 1 !== giftValue ? 'rgba(0, 0, 0, 0.7)' : fill;
    })
    .attr('stroke-width', (d, i) => i + 1 === giftValue ? '5' : '0')
    .attr('stroke', (d, i) => i + 1 === giftValue ? '' : '');

  sections
    .filter((d, i) => i + 1 === giftValue)
    .raise();

  const texts = wheelGroup.selectAll('.section-text');
  texts
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('filter', (d, i) => i + 1 !== giftValue ? 'blur(3px)' : 'none');
}

// Function for animation that starts when rotation starts
export function startSpinAnimations(
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
    giftValue,
    isPointerArrowImage
) {
  animateWheelGroup(wheelGroup, centerX, centerY, targetRotation, circleRadius, screenHeight);
  animatePointerArrowGroup(pointerArrowGroup, circleRadius, centerX, centerY);
  animateSVGContainer(screenWidth);
  animateBorderContainer(borderContainer, centerX, centerY, circleRadius, screenHeight);
  animateBorderImageContainer(circleRadius, centerX, centerY, screenHeight);
  animatePointerArrowGroupEnd(pointerArrowGroup, circleRadius, centerX, centerY, screenHeight, isPointerArrowImage);
  animateSpinButton(spinButton, centerX, centerY, screenWidth, screenHeight, circleRadius);
  if (!isImageButton) {
    animateSpinButtonText(spinButtonText, centerX, centerY, screenWidth, screenHeight, circleRadius);
    animateSpinButtonImage(spinButtonImage, centerX, centerY, screenWidth, screenHeight, circleRadius);
  }

  animateWheelSections(wheelGroup, giftValue, middlePartImageUri);
}
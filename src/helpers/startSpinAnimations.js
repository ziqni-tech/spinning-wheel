import * as d3 from 'd3';

const scale = 1.6;
const containerHeightOffsetAdjustment = 2;

// Animation for wheelGroup
function animateWheelGroup(
  wheelGroup,
  centerX,
  centerY,
  targetRotation,
  circleRadius,
  screenHeight
) {
  wheelGroup
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / containerHeightOffsetAdjustment) }) rotate(${ targetRotation }) scale(${ scale })`);
}

function animateGlowGroup(
  glowGroup,
  centerX,
  centerY,
  circleRadius,
  screenHeight
) {
  glowGroup
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / containerHeightOffsetAdjustment) }) scale(${ scale })`);
}

// Animation for pointerArrowGroup
function animatePointerArrowGroup(
  pointerArrowGroup,
  circleRadius,
  centerX,
  centerY,
  isPointerArrowImage,
  arrowOptions
) {

  const arrowImageSize = circleRadius / 2.5;
  pointerArrowGroup
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(150)
    .attr('transform', () => {
      const rotationAngle = -15;
      const radians = rotationAngle * Math.PI / 180;
      const xOffset = circleRadius * Math.sin(radians) / 2 + 10;

      if (isPointerArrowImage) {
        let arrowWidth = arrowOptions.width;
        let arrowHeight = arrowOptions.height;

        if (circleRadius < 180) {
          arrowWidth = circleRadius / 3;
          arrowHeight = circleRadius / 3;
        }

        let transformY = centerY - circleRadius - arrowHeight / 2;
        const adjustment = 10;

        switch (arrowOptions.position) {
          case 'top':
            transformY -= adjustment * 2;
            break;
          case 'middle':
            transformY -= adjustment / 2;
            break;
          case 'bottom':
            transformY += adjustment;
            break;
        }
        return `translate(${ centerX - arrowWidth / 2 + xOffset }, ${ transformY }) rotate(${ rotationAngle })`;
      } else {
        return `translate(${ centerX - arrowImageSize / 2 + xOffset }, ${ centerY - circleRadius - arrowImageSize / 2 - 10 }) rotate(${ rotationAngle })`;
      }

    });
}

// Animation for pointerArrowGroup at the end
function animatePointerArrowGroupEnd(
  pointerArrowGroup,
  circleRadius,
  centerX,
  centerY,
  screenHeight,
  isPointerArrowImage,
  arrowOptions
) {
  const arrowImageSize = isPointerArrowImage ? circleRadius / 2.5 : circleRadius / 2.5;
  pointerArrowGroup
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', () => {
      const rotationAngle = 0;
      if (isPointerArrowImage) {
        let arrowOptionsWidth = arrowOptions.width;
        let arrowOptionsHeight = arrowOptions.height;

        if (circleRadius < 180) {
          arrowOptionsWidth = circleRadius / 3;
          arrowOptionsHeight = circleRadius / 3;
        }

        const newOffsetX = centerX - (circleRadius * Math.sin(rotationAngle * Math.PI / 180)) - arrowOptionsWidth;
        const adjustment = 10;
        const arrowHeight = arrowOptionsHeight * scale
        let newOffsetY = centerY + (screenHeight / containerHeightOffsetAdjustment) - circleRadius * scale - arrowHeight / 2;

        switch (arrowOptions.position) {
          case 'top':
            newOffsetY -= adjustment * 2;
            break;
          case 'middle':
            newOffsetY -= adjustment / 2;
            break;
          case 'bottom':
            newOffsetY += adjustment;
            break;
        }

        return `translate(${ newOffsetX }, ${ newOffsetY }) rotate(${ rotationAngle }) scale(${ scale })`;
      } else {

        const newOffsetX = centerX - (circleRadius * Math.sin(rotationAngle * Math.PI / 180)) - arrowImageSize + 20;
        const newOffsetY = centerY + (screenHeight / containerHeightOffsetAdjustment) - circleRadius * 1.8 - arrowImageSize / 2 - 16;

        return `translate(${ newOffsetX }, ${ newOffsetY }) rotate(${ rotationAngle }) scale(${ scale })`;
      }
    });
}

// Animation for borderContainer
function animateBorderContainer(
  borderContainer,
  centerX,
  centerY,
  circleRadius,
  screenHeight
) {
  borderContainer
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / containerHeightOffsetAdjustment) }) scale(${ scale })`);
}

function animateButtonContainer(centerX, centerY, screenHeight) {
  d3.select('.button-container')
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / containerHeightOffsetAdjustment) }) scale(${ scale })`);
}

function animateBorderImageContainer(
  circleRadius,
  centerX,
  centerY,
  screenHeight
) {
  d3.select('.border-image-container')
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / containerHeightOffsetAdjustment) }) scale(${ scale })`);
}

// Animation for wheel sections
function animateWheelSections(wheelGroup, giftValue, middlePartImageUri) {

  wheelGroup.selectAll('.path-section')
    .each(function (d) {
      const section = d3.select(this);
      if (d.id === giftValue) {
        section.raise();
      }
    });

  // Then add masks for the remaining sections
  wheelGroup.selectAll('.path-section')
    .each(function (d) {
      const section = d3.select(this);

      wheelGroup.append('path')
        .transition()
        .duration(1000)
        .ease(d3.easeBackOut.overshoot(0.3))
        .delay(4500)
        .attr('class', 'global-mask-overlay')
        .attr('d', section.attr('d'))
        .attr('fill', d.id !== giftValue ? 'rgba(0, 0, 0, 0.7)' : 'none')
        .attr('pointer-events', 'none')
        .attr('stroke', d.id !== giftValue ? 'none' : 'rgba(0,0,0,0)')
        .attr('stroke-width', d.id !== giftValue ? '0' : '8');
    });
}

// Function for animation that starts when rotation starts
export function startSpinAnimations(
  wheelGroup,
  glowGroup,
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
  isPointerArrowImage,
  arrowOptions
) {
  animateWheelGroup(wheelGroup, centerX, centerY, targetRotation, circleRadius, screenHeight);
  animateGlowGroup(glowGroup, centerX, centerY, circleRadius, screenHeight);
  animatePointerArrowGroup(pointerArrowGroup, circleRadius, centerX, centerY, isPointerArrowImage, arrowOptions);
  animateBorderContainer(borderContainer, centerX, centerY, circleRadius, screenHeight);
  animateButtonContainer(centerX, centerY, screenHeight);
  animateBorderImageContainer(circleRadius, centerX, centerY, screenHeight);
  animatePointerArrowGroupEnd(pointerArrowGroup, circleRadius, centerX, centerY, screenHeight, isPointerArrowImage, arrowOptions);
  animateWheelSections(wheelGroup, giftValue, middlePartImageUri);
}

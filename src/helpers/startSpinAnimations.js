import * as d3 from 'd3';

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
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / 6) }) rotate(${ targetRotation }) scale(1.8)`);
}

// Animation for pointerArrowGroup
function animatePointerArrowGroup(
  pointerArrowGroup,
  circleRadius,
  centerX,
  centerY
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

      return `translate(${ centerX - arrowImageSize / 2 + xOffset }, ${ centerY - circleRadius - arrowImageSize / 2 - 10 }) rotate(${ rotationAngle })`;
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
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / 6) }) scale(1.8)`);
}

function animateButtonContainer(centerX, centerY, screenHeight) {
  d3.select('.button-container')
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / 6) }) scale(1.8)`);
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
    .attr('transform', `translate(${ centerX },${ centerY + (screenHeight / 6) }) scale(1.8)`);
}

// Animation for pointerArrowGroup at the end
function animatePointerArrowGroupEnd(
  pointerArrowGroup,
  circleRadius,
  centerX,
  centerY,
  screenHeight,
  isPointerArrowImage
) {
  const arrowImageSize = isPointerArrowImage ? circleRadius / 2.5 : circleRadius / 2.5;
  pointerArrowGroup
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', () => {
      const rotationAngle = 0;
      const newOffsetX = isPointerArrowImage
        ? centerX - (circleRadius * Math.sin(rotationAngle * Math.PI / 180)) - arrowImageSize + 15
        : centerX - (circleRadius * Math.sin(rotationAngle * Math.PI / 180)) - arrowImageSize + 20;
      const newOffsetY = isPointerArrowImage
        ? centerY + (screenHeight / 6) - circleRadius * 1.8 - arrowImageSize / 2 - 56
        : centerY + (screenHeight / 6) - circleRadius * 1.8 - arrowImageSize / 2 - 66;

      return `translate(${ newOffsetX }, ${ newOffsetY }) rotate(${ rotationAngle }) scale(1.8)`;
    });
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
        .attr('stroke', d.id !== giftValue ? 'none' : '#EE3EC8')
        .attr('stroke-width', d.id !== giftValue ? '0' : '8');
    });
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
  animateBorderContainer(borderContainer, centerX, centerY, circleRadius, screenHeight);
  animateButtonContainer(centerX, centerY, screenHeight);
  animateBorderImageContainer(circleRadius, centerX, centerY, screenHeight);
  animatePointerArrowGroupEnd(pointerArrowGroup, circleRadius, centerX, centerY, screenHeight, isPointerArrowImage);
  animateWheelSections(wheelGroup, giftValue, middlePartImageUri);
}

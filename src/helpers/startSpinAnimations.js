// Animation for wheelGroup
function animateWheelGroup(wheelGroup, targetRotation, circleRadius, screenHeight) {
  wheelGroup
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ circleRadius + 4 },${ circleRadius + (screenHeight / 6) }) rotate(${ targetRotation }) scale(1.8)`);
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
function animateBorderContainer(borderContainer, circleRadius, screenHeight) {
  borderContainer
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ circleRadius + 4 },${ circleRadius + (screenHeight / 6) }) scale(1.8)`);
}

function animateBorderImageContainer(circleRadius, screenHeight) {
  d3.select('.border-image')
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', `translate(${ circleRadius + 4 },${ circleRadius + (screenHeight / 6) }) scale(1.8)`);
}

// Animation for pointerArrowGroup at the end
function animatePointerArrowGroupEnd(pointerArrowGroup, circleRadius, centerX, centerY, screenHeight) {
  const arrowImageSize = circleRadius / 2.5;
  pointerArrowGroup
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', () => {
      const rotationAngle = 0;
      const newOffsetX = centerX - (circleRadius * Math.sin(rotationAngle * Math.PI / 180)) - arrowImageSize;
      const newOffsetY = centerY + (screenHeight / 6) - circleRadius * 1.8 - arrowImageSize / 2 - 36;

      return `translate(${ newOffsetX }, ${ newOffsetY }) rotate(${ rotationAngle }) scale(1.8)`;
    });
}

// Animation for spinButton
function animateSpinButton(spinButton, centerX, centerY, screenHeight, circleRadius) {
  spinButton
    .transition()
    .duration(1000)
    .ease(d3.easeBackOut.overshoot(0.3))
    .delay(4000)
    .attr('transform', () => {
      const newOffsetY = centerY + (screenHeight / 6) - circleRadius * 1.8 - 10;
      return `translate(${ -centerX + 25 }, ${ newOffsetY }) scale(1.8)`;
    });
}

function animateSpinButtonText(spinButtonText, centerX, centerY, screenHeight, circleRadius) {
    spinButtonText
        .transition()
        .duration(1000)
        .ease(d3.easeBackOut.overshoot(0.3))
        .delay(4000)
        .attr('transform', () => {
            const newOffsetY = centerY + (screenHeight / 6) - circleRadius * 1.8 - 10;
            return `translate(${ -centerX + 25 }, ${ newOffsetY }) scale(1.8)`;
        });
}

function animateSpinButtonImage(spinButtonImage, centerX, centerY, screenHeight, circleRadius) {
    spinButtonImage
        .transition()
        .duration(1000)
        .ease(d3.easeBackOut.overshoot(0.3))
        .delay(4000)
        .attr('transform', () => {
            const newOffsetY = centerY + (screenHeight / 6) - circleRadius * 1.8 - 10;
            return `translate(${ -centerX + 25 }, ${ newOffsetY }) scale(1.8)`;
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
    giftValue
) {
  animateWheelGroup(wheelGroup, targetRotation, circleRadius, screenHeight);
  animatePointerArrowGroup(pointerArrowGroup, circleRadius, centerX, centerY);
  animateSVGContainer(screenWidth);
  animateBorderContainer(borderContainer, circleRadius, screenHeight);
  animateBorderImageContainer(circleRadius, screenHeight);
  animatePointerArrowGroupEnd(pointerArrowGroup, circleRadius, centerX, centerY, screenHeight);
  animateSpinButton(spinButton, centerX, centerY, screenHeight, circleRadius);
  animateSpinButtonText(spinButtonText, centerX, centerY, screenHeight, circleRadius);
  animateSpinButtonImage(spinButtonImage, centerX, centerY, screenHeight, circleRadius);
  animateWheelSections(wheelGroup, giftValue, middlePartImageUri);
}
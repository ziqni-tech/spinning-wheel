import * as d3 from 'd3';

let isSpinning = false;

function updateButtonRotationAngle() {
  if (!isSpinning) return;

  const wheelGroupTransform = d3.select('.wheel-group').attr('transform');
  const rotateMatch = /rotate\(([-\d.]+)\)/.exec(wheelGroupTransform);
  const currentRotation = rotateMatch ? parseFloat(rotateMatch[1]) : 0;

  const buttonImageGroup = d3.select('.spin-button');
  const buttonImage = d3.select('.spin-button-image');
  const buttonText= d3.select('.spin-button-text');
  const buttonTransform = `rotate(${ -currentRotation })`;
  buttonImageGroup.attr('transform', buttonTransform);
  buttonImage.attr('transform', buttonTransform);
  buttonText.attr('transform', buttonTransform);

  requestAnimationFrame(updateButtonRotationAngle); // Continue updating in the next frame
}

export function startUpdateButtonRotationAngle() {
  isSpinning = true;
  updateButtonRotationAngle();
}

export function stopUpdateButtonRotationAngle() {
  isSpinning = false;
}
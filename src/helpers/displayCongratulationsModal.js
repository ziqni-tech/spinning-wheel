export function displayCongratulationsModal(giftValue, tilesData, clearSVG, startConfetti, resetWheel, startTimeOut) {
  const congratulationsModal = document.getElementById('congratulations-modal');
  const modalHeader = document.querySelector('.modal-header');
  const winCard = document.querySelector('.win-card');
  const rewardButtons = document.querySelector('.reward-buttons');
  const claimRewardButton = document.querySelector('.claim-reward-btn');
  const declineRewardButton = document.querySelector('.decline-reward-btn');

  const text = tilesData[giftValue - 1].text;

  const regex = /<(h[1-6]|p)\s*class="[^"]*"><span\s+style="color:\s*rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\);">([^<]+)<\/span><\/\1>/g;
  const matches = [...text.matchAll(regex)];

  const contents = [];
  matches.forEach(match => {
    const tag = match[1];
    const content = match[2];
    contents.push(content);
  });

  const prizeDataElement = document.querySelector('.prize-data');

  const quantitySpan = document.createElement('span');
  quantitySpan.className = 'quantity';
  quantitySpan.textContent = contents[0];

  const prizeNameSpan = document.createElement('span');
  prizeNameSpan.className = 'prize-name';
  prizeNameSpan.textContent = contents[1];

  prizeDataElement.innerHTML = '';

  prizeDataElement.appendChild(quantitySpan);
  prizeDataElement.appendChild(prizeNameSpan);

  setTimeout(() => {
    congratulationsModal.style.top = '0';
    winCard.style.display = 'flex';
    modalHeader.style.display = 'flex';
    rewardButtons.style.display = 'flex';
    clearSVG();
  }, startTimeOut);

  setTimeout(() => {
    startConfetti();
  }, startTimeOut);

  claimRewardButton.addEventListener('click', () => {
    resetWheel();
  });

  declineRewardButton.addEventListener('click', () => {
    resetWheel();
  });
}
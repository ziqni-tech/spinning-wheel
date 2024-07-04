import { createSpinnerWheel } from './tipicoSpinnerWheel.js';

window.addEventListener('message', function(event) {
    const { tiles, settingsData, prizeSection } = event.data;

    createSpinnerWheel(tiles, settingsData, prizeSection);
});

// createSpinnerWheel();
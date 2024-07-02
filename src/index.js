import { createSpinnerWheel } from './spinnerWheel.js';

window.addEventListener('message', function(event) {
    const { tiles, settingsData } = event.data;

    createSpinnerWheel(tiles, settingsData);
});

// createSpinnerWheel();
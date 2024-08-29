// Configuration
const checkInterval = 1000; // Check video progress every 1 second
const scrollTimeout = 10000; // Scroll after 10 seconds of no progress or if video ends

let lastTime = 0;
let stuckCounter = 0;

function getActiveVideo() {
    return document.querySelector('video[src]:not([src=""])');
}

function scrollToNextVideo() {
    const nextButton = document.querySelector('button.ytd-reel-player-overlay-renderer[aria-label="Next video"]');
    if (nextButton) {
        nextButton.click();
        console.log("Clicked next video button");
    } else {
        window.scrollBy(0, window.innerHeight);
        console.log("Scrolled to next video");
    }
    stuckCounter = 0;
    lastTime = 0;
}

function checkVideoProgress() {
    const video = getActiveVideo();
    if (!video) {
        console.log("No active video found");
        return;
    }

    const currentTime = video.currentTime;
    const duration = video.duration;
    console.log(`Current video time: ${currentTime.toFixed(2)}/${duration.toFixed(2)}`);

    if (currentTime === lastTime || currentTime >= duration - 0.1) {
        stuckCounter++;
        console.log(`Video stuck or ended for ${stuckCounter} seconds`);
        if (stuckCounter >= scrollTimeout / checkInterval) {
            console.log("Video stuck or paused too long, scrolling to next");
            scrollToNextVideo();
        }
    } else {
        stuckCounter = 0;
    }

    lastTime = currentTime;
}

function initAutoScroll() {
    console.log("Initializing auto-scroll");
    setInterval(checkVideoProgress, checkInterval);
}

// Start the auto-scroll process
initAutoScroll();

// Listen for navigation events (for single-page apps like YouTube)
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        console.log('URL changed. Reinitializing auto-scroll...');
        initAutoScroll();
    }
}).observe(document, {subtree: true, childList: true});

// Add error handling
window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.error);
});
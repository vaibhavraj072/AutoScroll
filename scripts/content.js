let scrollInterval = null;
let currentSpeed = 3;

// Initialize from storage
chrome.storage.local.get(["isScrolling", "speed"], (result) => {
    if (result.isScrolling && isYoutubeShorts()) {
        startScrolling(result.speed || 3);
    }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "toggleScroll") {
        if (message.isScrolling) {
            startScrolling(message.speed);
        } else {
            stopScrolling();
        }
    } else if (message.command === "updateSpeed") {
        if (scrollInterval) {
            startScrolling(message.speed);
        }
    }
});

// Handle ESC key press
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        stopScrolling();
        chrome.storage.local.set({ isScrolling: false });
    }
});

// Check if current page is YouTube Shorts
function isYoutubeShorts() {
    return window.location.pathname.includes("/shorts");
}

// Start auto-scrolling
function startScrolling(speed) {
    stopScrolling();
    currentSpeed = speed;
    scrollInterval = setInterval(scrollToNextShort, speed * 1000);
}

// Stop auto-scrolling
function stopScrolling() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}

// Scroll to next Short
function scrollToNextShort() {
    const currentShort = document.querySelector('ytd-reel-video-renderer[is-active]');
    if (currentShort) {
        const nextShort = currentShort.nextElementSibling;
        if (nextShort) {
            nextShort.scrollIntoView({ behavior: "smooth" });
        }
    }
}

// Watch for navigation changes
const observer = new MutationObserver(() => {
    if (!isYoutubeShorts()) {
        stopScrolling();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
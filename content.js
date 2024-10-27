let isScrolling = false;
let scrollInterval;

function startScrolling() {
    if (isScrolling) return;

    isScrolling = true;
    console.log("Scrolling started");
    scrollInterval = setInterval(() => {
        window.scrollBy(0, 1); // Scroll down by 1 pixel
    }, 50); // Adjust scroll speed as necessary
}

function stopScrolling() {
    if (!isScrolling) return;

    isScrolling = false;
    clearInterval(scrollInterval);
    console.log("Scrolling stopped");
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleScrolling") {
        if (isScrolling) {
            stopScrolling();
        } else {
            startScrolling();
        }
        sendResponse({ isScrolling });
    }
});

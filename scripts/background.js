chrome.runtime.onInstalled.addListener(() => {
    // Initialize extension settings
    chrome.storage.local.set({
        isScrolling: false,
        speed: 3
    });
});
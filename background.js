chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === "pause") {
      // Pause the auto-scroll feature
      clearInterval(autoScrollInterval);
    } else if (request === "play") {
      // Resume the auto-scroll feature
      autoScrollInterval = setInterval(autoScroll, 1000);
    }
  });
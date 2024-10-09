function getReelOrShortContainer() {
    // Get the container element for reels or shorts
    // This may vary depending on the platform (Instagram or YouTube)
    return document.querySelector(".reel-container") || document.querySelector(".short-container");
  }
  
  function getReelOrShortDuration() {
    // Get the duration of the current reel or short
    // This may vary depending on the platform (Instagram or YouTube)
    return parseInt(document.querySelector(".reel-duration")?.textContent) || parseInt(document.querySelector(".short-duration")?.textContent);
  }
  
  function autoScroll() {
    // Get the container element and duration
    const container = getReelOrShortContainer();
    const duration = getReelOrShortDuration();
  
    // Set a timeout to auto-scroll after the duration
    setTimeout(() => {
      // Scroll to the next reel or short
      container.scrollIntoView({ behavior: "smooth" });
    }, duration * 1000);
  }
  
  // Listen for changes in the reel or short container
  document.addEventListener("DOMSubtreeModified", () => {
    autoScroll();
  });
  
  // Listen for user focus changes
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      autoScroll();
    }
  });
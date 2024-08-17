function autoScroll() {
    window.scrollBy(0, -100); // Scroll up by 100 pixels
  }
  
  function detectPlatformAndStart() {
    let interval;
  
    if (window.location.hostname.includes("instagram.com")) {
      interval = 5000; // Instagram Reels: Scroll every 5 seconds
    } else if (window.location.hostname.includes("youtube.com")) {
      interval = 7000; // YouTube Shorts: Scroll every 7 seconds
    }
  
    if (interval) {
      setInterval(autoScroll, interval);
    }
  }
  
  detectPlatformAndStart();
  
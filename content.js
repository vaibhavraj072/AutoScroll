// content.js

(function() {
  // Function to scroll up the YouTube Shorts video
  function autoScroll() {
    const scrollAmount = 100; // Adjust as needed
    window.scrollBy(0, -scrollAmount);
  }

  // Scroll every 5 seconds (5000 milliseconds)
  setInterval(autoScroll, 5000);
})();

// Configuration for auto-scroll
const scrollAmount = window.innerHeight; // Scroll by the height of the window
const scrollDelay = 3000; // Delay between scrolls in milliseconds

// Function to perform auto-scroll
function autoScroll() {
  window.scrollBy(0, scrollAmount);
  console.log("Auto-scrolling...");
}

// Initialize auto-scroll
setTimeout(() => {
  setInterval(autoScroll, scrollDelay);
}, 2000); // Initial delay to ensure the page is loaded

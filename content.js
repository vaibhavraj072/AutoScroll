console.log('YouTube Shorts Auto-Scroll: Content script loaded');

const SCROLL_INTERVAL = 5000; // 5 seconds

function autoScroll() {
  try {
	console.log('Attempting to scroll...');
	window.scrollBy(0, window.innerHeight);
	console.log('Scrolled by', window.innerHeight, 'pixels');
  } catch (error) {
	console.error('Error during auto-scroll:', error);
  }
}

function initAutoScroll() {
  console.log("Initializing auto-scroll");
  setInterval(autoScroll, SCROLL_INTERVAL);
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
}).observe(document, { subtree: true, childList: true });

// Add error handling
window.addEventListener('error', function(event) {
  console.error('An error occurred:', event.error);
});

const SCROLL_INTERVAL = 5000; // 5 seconds

function autoScroll() {
  try {
	console.log('Attempting to scroll...');
	window.scrollBy(0, window.innerHeight);
	console.log('Scrolled by', window.innerHeight, 'pixels');
  } catch (error) {
	console.error('Error during auto-scroll:', error);
  }
}

function initAutoScroll() {
  console.log("Initializing auto-scroll");
  setInterval(autoScroll, SCROLL_INTERVAL);
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
}).observe(document, { subtree: true, childList: true });

// Add error handling
window.addEventListener('error', function(event) {
  console.error('An error occurred:', event.error);
});
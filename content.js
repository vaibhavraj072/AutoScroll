console.log('YouTube Shorts Auto-Scroll: Content script loaded');

const SCROLL_INTERVAL = 5000; // 5 seconds
const INITIAL_DELAY = 3000; // 3 seconds

function autoScroll() {
  console.log('Attempting to scroll...');
  window.scrollBy(0, window.innerHeight);
  console.log('Scrolled by', window.innerHeight, 'pixels');
}

// Add a test button to the page
function addTestButton() {
  const button = document.createElement('button');
  button.textContent = 'Test Scroll';
  button.style.position = 'fixed';
  button.style.top = '10px';
  button.style.right = '10px';
  button.style.zIndex = '9999';
  button.addEventListener('click', autoScroll);
  document.body.appendChild(button);
}

// Run this immediately
addTestButton();

setTimeout(() => {
  console.log('Starting auto-scroll');
  setInterval(autoScroll, SCROLL_INTERVAL);
}, INITIAL_DELAY);
let platform = '';
let videoElement = null;

function detectPlatform() {
  if (window.location.hostname.includes('instagram.com')) {
    platform = 'instagram';
  } else if (window.location.hostname.includes('youtube.com')) {
    platform = 'youtube';
  }
}

function scrollUp() {
  window.scrollBy(0, -window.innerHeight); // Scroll up by one viewport height
}

function handleVideo(platform) {
  // Detect video element and monitor for changes
  videoElement = document.querySelector('video');
  if (videoElement) {
    videoElement.addEventListener('ended', () => {
      scrollUp();
    });
  }
}

function initialize() {
  detectPlatform();
  if (platform === 'instagram' || platform === 'youtube') {
    handleVideo(platform);
  }
}

initialize();

// Clean up event listeners on page unload
window.addEventListener('beforeunload', () => {
  if (videoElement) {
    videoElement.removeEventListener('ended', scrollUp);
  }
});
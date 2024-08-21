// sw.js

const CACHE_NAME = 'my-cache-v1';
const URLs_TO_CACHE = [
  '/',
  '/content.js',
  // Add other essential files if needed
];

// Install event to cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLs_TO_CACHE).catch((error) => {
        console.error('Failed to cache some URLs:', error);
        // Additional logging or actions
      });
    })
  );
});

// Fetch event to handle cache and network requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request).catch((fetchError) => {
          console.error('Fetch error:', fetchError);
        });
      })
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

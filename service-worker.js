// Build Civic Sense — Service Worker
// This file makes the app work OFFLINE

const CACHE_NAME = 'civic-sense-v1';

// All files to save on the phone
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-48.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap'
];

// ── INSTALL: save files to phone storage ──
self.addEventListener('install', event => {
  console.log('[SW] Installing and caching files...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: clean up old caches ──
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

// ── FETCH: serve from cache when offline ──
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Found in cache — return it (works offline!)
        return cached;
      }
      // Not in cache — try the network
      return fetch(event.request).then(response => {
        // Save a copy in cache for next time
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, copy);
          });
        }
        return response;
      }).catch(() => {
        // Network failed too — show offline page
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

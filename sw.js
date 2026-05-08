const CACHE_NAME = 'jefatura-bcql-v8.37';
const ASSETS = [
  '/jefatura-quilmes/',
  '/jefatura-quilmes/index.html',
  '/jefatura-quilmes/manifest.json',
  '/jefatura-quilmes/icon-192.png',
  '/jefatura-quilmes/icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).catch(function() {
        return caches.match('/jefatura-quilmes/index.html');
      });
    })
  );
});

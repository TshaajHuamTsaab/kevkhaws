const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = [
  "/",             // homepage
  "/index.html",   // main page
  "/style.css",    // your CSS
  "/app.js",       // your JS
  "/manifest.json" // manifest
];

// Install service worker & cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

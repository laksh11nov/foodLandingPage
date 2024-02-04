// service-worker.js

const CACHE_NAME = 'food-landing-page-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/external.css',
  '/assets/css/animate.css',
  '/assets/css/line-awesome.min.css',
  '/assets/css/style.css',
  '/assets/js/external.js',
  '/assets/js/animate.js',
  '/assets/js/main.js',
  '/assets/img/logo.svg',
  '/assets/img/unsplash_kcA-c3f_3FE.svg',
  '/assets/img/products/product-1.svg',
  '/assets/img/products/product-2.svg',
  '/assets/img/products/product-3.svg',
  '/assets/img/products/product-4.svg',
  '/assets/img/order%201.svg',
  '/assets/img/delivery%201.svg',
  '/assets/img/courier%201.svg',
  '/assets/img/Group%207.svg',
  '/assets/img/logo144.png',
  // Add more URLs that you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

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

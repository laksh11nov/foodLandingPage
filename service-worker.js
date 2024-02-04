// service-worker.js

const CACHE_NAME = 'food-landing-page-cache-v4';
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
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetchAndUpdateCache(event.request);
      })
      .catch(() => {
        return caches.match('/offline.html') || new Response(null, { status: 404, statusText: 'Not Found' });
      })
  );
});

function fetchAndUpdateCache(request) {
  return fetch(request)
    .then((response) => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      const clonedResponse = response.clone();

      caches.open(CACHE_NAME)
        .then((cache) => cache.put(request, clonedResponse));

      return response;
    })
    .catch(() => {
      return caches.match('/offline.html') || new Response(null, { status: 404, statusText: 'Not Found' });
    });
}

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

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// service-worker.js

const CACHE_NAME = 'food-landing-page-cache-v3';
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
        // Try fetching updated resource from the network
        return fetch(event.request)
          .then((responseFromNetwork) => {
            // If the response is not OK, return it directly
            if (!responseFromNetwork || responseFromNetwork.status !== 200 || responseFromNetwork.type !== 'basic') {
              return responseFromNetwork;
            }

            // Update cache with the new response
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseFromNetwork.clone());
              });

            // Return the network response
            return responseFromNetwork;
          })
          .catch(() => {
            // If fetching from network fails, return from cache
            return response || caches.match('/offline.html') || new Response(null, { status: 404, statusText: 'Not Found' });
            // You can replace '/offline.html' with any fallback resource
          });
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

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

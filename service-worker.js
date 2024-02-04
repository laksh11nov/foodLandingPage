const cacheName = 'food-landing-page-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/external.css',
  '/assets/css/animate.css',
  '/assets/css/line-awesome.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
  '/assets/css/style.css',
  '/assets/js/external.js',
  '/assets/js/animate.js',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js',
  '/assets/js/main.js',
  '/assets/img/logo.svg',
  '/assets/img/unsplash_kcA-c3f_3FE.svg',
  '/assets/img/products/product-1.svg',
  '/assets/img/products/product-2.svg',
  '/assets/img/products/product-3.svg',
  '/assets/img/products/product-4.svg',
  '/assets/img/order 1.svg',
  '/assets/img/delivery 1.svg',
  '/assets/img/courier 1.svg',
  '/assets/img/Group 7.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

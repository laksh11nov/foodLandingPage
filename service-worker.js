const cacheName = 'food-landing-page-v2';

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

self.addEventListener('install', async (event) => {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(filesToCache);
  } catch (error) {
    console.error('Service Worker install failed:', error);
  }
});

self.addEventListener('activate', async (event) => {
  try {
    const cacheKeys = await caches.keys();
    await Promise.all(
      cacheKeys.map((key) => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
        return null;
      })
    );
  } catch (error) {
    console.error('Service Worker activation failed:', error);
  }
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      try {
        const response = await caches.match(event.request);
        return response || fetch(event.request);
      } catch (error) {
        console.error('Service Worker fetch error:', error);
      }
    })()
  );
});

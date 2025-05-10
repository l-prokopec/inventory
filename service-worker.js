self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        'index.html',
        'inventory.js',
        'style.css',
        'manifest.json',
        'icons/klobas.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});

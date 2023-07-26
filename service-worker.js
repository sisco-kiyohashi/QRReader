// Service Workerの登録
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// キャッシュの追加
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cache-name').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './css/style.css'
      ]);
    })
  );
});

// オフライン時の動作
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
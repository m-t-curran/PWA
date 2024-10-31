self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('sleep-tracker-cache').then((cache) => {
            return cache.addAll([
                '/index.html',
                '/style.css',
                '/app.js',
                '/manifest.json'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        // Intercept all navigation requests and respond with `index.html`
        event.respondWith(
            caches.match('/index.html').then((response) => {
                return response || fetch('/index.html');
            })
        );
    } else {
        // For other requests, try the cache first, then network if not found
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

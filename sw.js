self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('sleep-tracker-cache').then((cache) => {
            return cache.addAll([
                '/index.html',
                '/style.css',
                '/app.js',
                '/manifest.json',
                'https://cdn.jsdelivr.net/npm/chart.js' // Cache Chart.js library from CDN
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        // Always serve index.html for navigation requests
        event.respondWith(
            caches.match('/index.html').then((response) => {
                return response || fetch('/index.html');
            })
        );
    } else {
        // For other requests, try to serve from cache, then fallback to network
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('sleep-tracker-cache').then((cache) => {
            return cache.addAll([
                '/index.html',
                '/style.css',
                '/app.js',
                '/manifest.json',
                'https://cdn.jsdelivr.net/npm/chart.js' // Cache the CDN version of Chart.js
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        // Serve index.html for navigation requests
        event.respondWith(
            caches.match('/index.html').then((response) => {
                return response || fetch('/index.html');
            })
        );
    } else {
        // Serve cached files, falling back to the network if not available
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((networkResponse) => {
                    // Cache the new file if fetched from network
                    return caches.open('sleep-tracker-cache').then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});

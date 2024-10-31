self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('sleep-tracker-cache').then((cache) => {
            return cache.addAll(['/index.html']);
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
        // For non-navigation requests, attempt to fetch from the network
        event.respondWith(fetch(event.request));
    }
});

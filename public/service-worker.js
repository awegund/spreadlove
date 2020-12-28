// Install SW
self.addEventListener('install', function(event) {
    //console.log('[ServiceWorker installing:] ', event);
})

self.addEventListener('activate', function(event) {
    //console.log('[ServiceWorker activation:] ', event);
})



// FETCH
self.addEventListener('fetch', function(event) {
    console.log('[ServiceWorker fetch-event:] ', event);
    event.respondWith(fetch(event.request));
})
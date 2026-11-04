const CACHE_NAME = "henro-rpg-v3";

const urlsToCache = [
    "./title.html",
    "./index.html",

    "./css/base.css",
    "./css/title.css",

    "./js/game.js",
    "./js/title.js",
    
    "./icon-192.png",
    "./icon-512.png",
    "./icon-180.png",
    "./images/overview-map-01.png"
];

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }

                })

            );

        })

    );

});

self.clients.claim();

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(urlsToCache);

            })

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })

    );

});
const CACHE_NAME = "henro-rpg-v6";

const urlsToCache = [
    "./",
    "./title.html",
    "./index.html",

    "./css/base.css",
    "./css/title.css",

    "./js/game.js",
    "./js/title.js",
    
    "./icon-192.png",
    "./icon-512.png",
    "./icon-180.png",
    "./overview-map-01.png"
];

// インストール（即座に新しいService Workerを待機解除してキャッシュ保存）
self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// 有効化（古いキャッシュを削除し、すぐに画面を制御下に置く）
self.addEventListener("activate", event => {
    event.waitUntil(
        Promise.all([
            caches.keys().then(keys => {
                return Promise.all(
                    keys.map(key => {
                        if (key !== CACHE_NAME) {
                            return caches.delete(key);
                        }
                    })
                );
            }),
            self.clients.claim()
        ])
    );
});

// 通信処理（キャッシュ優先 → ネットから取得）
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

/* Letter Trace — tiny offline cache.
   The whole app is index.html, so this only needs to keep that one file. */
const CACHE = "letter-trace-v2";
const ASSETS = ["./", "./index.html"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if(req.method !== "GET") return;

  // Navigations: serve the network when it is there, fall back to the cached app.
  if(req.mode === "navigate"){
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put("./index.html", copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req))
  );
});

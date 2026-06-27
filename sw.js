/* GitDOS service worker — офлайн-кэш оболочки приложения.
   HTML — network-first (всегда свежий интерфейс), статика js-dos — cache-first.
   Аналитика и api.github.com (другой origin) НЕ перехватываются. */
const CACHE = 'gitdos-v1';
const SHELL = [
  './', 'index.html', 'favicon.svg', 'manifest.json', 'icon-192.png', 'icon-512.png',
  'vendor/js-dos/js-dos.js', 'vendor/js-dos/js-dos.css',
  'vendor/js-dos/emulators/emulators.js',
  'vendor/js-dos/emulators/wdosbox.js', 'vendor/js-dos/emulators/wdosbox.wasm',
  'vendor/js-dos/emulators/wlibzip.js', 'vendor/js-dos/emulators/wlibzip.wasm'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // analytics, GitHub и пр. — обычная сеть

  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(
      fetch(req).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); return r; })
        .catch(() => caches.match(req).then((m) => m || caches.match('index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((m) => m || fetch(req).then((r) => {
      if (r && r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); }
      return r;
    }))
  );
});

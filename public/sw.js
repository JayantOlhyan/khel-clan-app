const CACHE_NAME_PREFIX = 'khelclan-pwa-';
const CACHE_STATIC = CACHE_NAME_PREFIX + 'static-v1';
const CACHE_PAGES = CACHE_NAME_PREFIX + 'pages-v1';

const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/maskable-512.png'
];

// Install Event - Precache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then((cache) => {
        console.log('[Service Worker] Pre-caching offline shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheAllowlist = [CACHE_STATIC, CACHE_PAGES];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith(CACHE_NAME_PREFIX) && !cacheAllowlist.includes(cacheName)) {
            console.log('[Service Worker] Deleting obsolete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Intercept network requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // 2. Skip cross-origin requests unless they are fonts/images from allowed CDNs
  const isSameOrigin = url.origin === self.location.origin;
  const isAllowedCDN = url.origin.includes('fonts.googleapis.com') || 
                       url.origin.includes('fonts.gstatic.com') ||
                       url.origin.includes('images.unsplash.com');

  if (!isSameOrigin && !isAllowedCDN) return;

  // 3. Skip sensitive firebase/auth/API endpoints
  if (
    url.pathname.startsWith('/__/auth') || 
    url.pathname.includes('googleapis.com/identitytoolkit') ||
    url.pathname.includes('firestore.googleapis.com') ||
    url.hostname.includes('firebaseio.com')
  ) {
    return;
  }

  // 4. Page Navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If response is valid, cache a copy of the page
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_PAGES).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => {
          // Network failed - attempt to serve from page cache first, then fall back to offline page
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) return cachedResponse;
              
              // Fallback to pre-cached offline page
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // 5. Static Assets (JS, CSS, Fonts, Images)
  const isStaticAsset = 
    url.pathname.includes('/_expo/static/') ||
    url.pathname.includes('/assets/') ||
    isAllowedCDN ||
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf|json)$/i.test(url.pathname);

  if (isStaticAsset) {
    // Stale-While-Revalidate Strategy
    event.respondWith(
      caches.open(CACHE_STATIC).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch((err) => {
              console.log('[Service Worker] Runtime fetch failed for:', event.request.url);
            });
          // Return cached version immediately if available, otherwise wait for network
          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});

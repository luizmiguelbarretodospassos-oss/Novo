// ============================================
// SERVICE WORKER - Suporte Offline
// ============================================

const CACHE_NAME = 'party-craft-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/global.css',
  '/css/os.css',
  '/css/apps.css',
  '/css/maps.css',
  '/css/games.css',
  '/js/core/file-system.js',
  '/js/core/window-manager.js',
  '/js/core/app-loader.js',
  '/js/core/os.js',
  '/js/data/apps-catalog.js',
  '/js/data/websites.js',
  '/js/data/locations.js',
  '/js/data/user-profile.js',
  '/js/apps/browser.js',
  '/js/apps/app-store.js',
  '/js/apps/phone.js',
  '/js/apps/messages.js',
  '/js/apps/video.js',
  '/js/apps/maps.js',
  '/js/apps/games.js',
  '/js/apps/camera.js',
  '/js/apps/files.js',
  '/js/apps/settings.js',
  '/js/games/party-games.js',
  '/js/games/mini-games/dance.js',
  '/js/games/mini-games/trivia.js',
  '/js/games/mini-games/drawing.js',
  '/js/games/mini-games/music.js',
  '/js/main.js'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 Cache aberto');
      return cache.addAll(urlsToCache);
    }).catch(err => {
      console.log('⚠️ Erro ao cachear:', err);
    })
  );
});

// Ativar Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch com estratégia Network First
self.addEventListener('fetch', event => {
  // Apenas cachear requisições GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Fazer cópia da resposta
        const responseClone = response.clone();
        
        // Cachear a resposta
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        
        return response;
      })
      .catch(() => {
        // Se falhar, tentar do cache
        return caches.match(event.request).then(response => {
          return response || new Response('Offline - Tente novamente quando conectado', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

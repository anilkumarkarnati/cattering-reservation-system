// Service Worker for PWA capabilities
const CACHE_NAME = "caterhub-v1.0.0"
const urlsToCache = [
  "/",
  "/index.html",
  "/admin.html",
  "/user-dashboard.html",
  "/styles/main.css",
  "/styles/admin.css",
  "/styles/user-dashboard.css",
  "/js/config.js",
  "/js/auth.js",
  "/js/products.js",
  "/js/cart.js",
  "/js/orders.js",
  "/js/admin.js",
  "/js/user-dashboard.js",
  "/js/logger.js",
  "/js/main.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    }),
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

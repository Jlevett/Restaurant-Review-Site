//Specify the cache version and the data to be cached.
var CACHE_NAME = 'restaurant-cache-v2';
var urlsToCache = [

  '/css/hamburgers.css',
  '/css/responsiveHome.css',
  '/css/responsiveReview.css',
  '/css/styles.css',

  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',

  '/img/1.jpg','/img/2.jpg','/img/3.jpg', '/img/4.jpg', '/img/5.jpg', '/img/6.jpg','/img/7.jpg','/img/8.jpg', '/img/9.jpg', '/img/10.jpg',

  '/data/restaurants.json',

  '/',
  '/restaurant.html',
];

/*Install a service worker*/
self.addEventListener('install', event => {
  //Add data to cache when we install the Service Worker.
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});
//Note: If any of the files fail to download, then the install step will fail.

/*Cache and return requests*/
//Now that the offline page is stored in cache, it can be retrieved whenever needed.
//Logic to return the offline page if we have connectivity or no connectivity
self.addEventListener('fetch', event => {
  event.respondWith(
    //ignoreSearch:true means that the query string in the URL is ignored.

    //if response is a value from the cache then return it.
    //else fetch response from server and return that
    caches.match(event.request, {ignoreSearch:true})
    .then((response = fetch(event.request)) => response)
  );
});

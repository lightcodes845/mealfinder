importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);

self.addEventListener('install', event => {
  console.log('Service worker installing...');
  // The skipWaiting() method allows a service worker to activate as soon as it finishes installation.
  // Add a call to skipWaiting here
  self.skipWaiting();
});

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
  // workbox.precaching.precacheAndRoute([]);

  //https://www.themealdb.com/images/media/meals/vytypy1511883765.jpg
  workbox.routing.registerRoute(
    /(.*)themealdb\.com\/images\/media\/meals\/(.*)\.(?:png|gif|jpg)/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );
  // https://www.themealdb.com/api/json/v1/1/search.php?s=fish

  workbox.routing.registerRoute(
    /(.*)themealdb\.com\/api\/json\/(.*)\/search\.php\?s=(.*)/,
    new workbox.strategies.CacheFirst({
      cacheName: 'json-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // 1hr
        }),
      ],
    })
  );

  // https://damiproxyapi.herokuapp.com/youtube/' + match
  workbox.routing.registerRoute(
    /.*damiproxyapi\.herokuapp\.com\/youtube\/.*/,
    new workbox.strategies.CacheFirst({
      cacheName: 'json-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1hr
        }),
      ],
    })
  );

  // // cache icons
  // // images/icon/icon.svg
  // workbox.routing.registerRoute(
  //   /images\/icon\/*/,
  //   workbox.strategies.staleWhileRevalidate({
  //     cacheName: 'icon-cache',
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         maxEntries: 5,
  //         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
  //       }),
  //     ],
  //   })
  // );

  // // http://cdn-images.deezer.com/images/artist/60d4753a9d5d97d1bee0132963611d7f/250x250-000000-80-0-0.jpg
  // workbox.routing.registerRoute(
  //   /(.*)cdn-images\.deezer\.com\/images(.*)\.(?:png|gif|jpg)/,
  //   workbox.strategies.staleWhileRevalidate({
  //     cacheName: 'images-cache',
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         maxEntries: 50,
  //         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
  //       }),
  //     ],
  //   })
  // );

  // const articleHandler = workbox.strategies.networkFirst({
  //   cacheName: 'articles-cache',
  //   plugins: [
  //     new workbox.expiration.Plugin({
  //       maxEntries: 50,
  //     }),
  //   ],
  // });

  // workbox.routing.registerRoute(/(.*)article(.*)\.html/, args =>
  //   articleHandler.handle(args).then(response => {
  //     // If the response doesn't exist, then it means the user is offline and the response was not previously cached
  //     if (!response) {
  //       return caches.match('pages/offline.html');
  //     }
  //     // If the response exists but the status is 404, then our custom 404 page is returned.
  //     else if (response.status === 404) {
  //       return caches.match('pages/404.html');
  //     }
  //     return response;
  //   })
  // );

  // const postsHandler = workbox.strategies.cacheFirst({
  //   cacheName: 'posts-cache',
  //   plugins: [
  //     new workbox.expiration.Plugin({
  //       maxEntries: 50,
  //     }),
  //   ],
  // });

  // workbox.routing.registerRoute(/(.*)pages\/post(.*)\.html/, args =>
  //   postsHandler
  //     .handle(args)
  //     .then(response => {
  //       // If the response exists but the status is 404, then our custom 404 page is returned.
  //       console.log(response);
  //       if (response.status === 404) {
  //         return caches.match('pages/404.html');
  //       }
  //       return response;
  //     })
  //     .catch(error => {
  //       // If the response doesn't exist, then it means the user is offline and the response was not previously cached
  //       return caches.match('pages/offline.html');
  //     })
  // );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

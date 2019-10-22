var DOMAIN_NAME = self.location.origin;
var API_BASEPOINT = DOMAIN_NAME + '/api';
var ARTICLE_API_CACHE = 'articles-api-cache';
var HOME_HTML_CACHE = 'homepage-html-cache';
var IMAGE_CACHE = 'image-cache';
var CSS_CACHE = 'css-cache';
importScripts('https://static.growthrx.in/js/push-sw.js?v5245');

if (workbox) {
	(function () {
	  var cacheAllHomePageApi = function cacheAllHomePageApi() {
		var acceptedTemplates = ['news', 'movie reviews'];
		var template = void 0,
			cacheName = void 0;
		return fetch(API_BASEPOINT + "/api_listing.cms?v=v1&source=pwa&curpg=1&section=top-news&lang=english&pp=20").then(function (response) {
		  response.json().then(function (result) {
			result.items.map(function (item, index) {
			  if (typeof item.id == 'undefined' || !acceptedTemplates.includes(item.tn) || index > 35) return;
  
			  switch (item.tn) {
				case 'news':
				case 'movie reviews':
				  template = 'api_articleshow';
				  cacheName = ARTICLE_API_CACHE;
				  break;
				default:
				  break;
			  }
			  var apiUrl = API_BASEPOINT + "/" + template + ".cms?v=v1&source=pwa&id=" + item.id + "&lid=" + (typeof item.lid != 'undefined' ? item.lid : 1)+"&utm_source=pwa&utm_medium=browser";
			  fetch(apiUrl).then(function (response) {
				if (response.status == 200) {
				  caches.open(cacheName).then(function (cache) {
					cache.put(apiUrl, response);
				  });
				}
			  });
			});
		  });
		});
	  };
  
	  //console.log('Yay! Workbox is loaded 🎉 at', DOMAIN_NAME);
	  //workbox.clientsClaim();
	  //workbox.precaching.suppressWarnings();
  
	  self.__precacheManifest.unshift(
		{
		  url: '/',
		  revision: new Date().getTime()
		},
		{
		  url: '/offline.html'
		}
	  );
  
	  workbox.precaching.precacheAndRoute(self.__precacheManifest || [], {
		directoryIndex: null,
		cleanUrls: false
	  });
  
	  workbox.routing.registerRoute('/', workbox.strategies.networkFirst({
		cacheName: HOME_HTML_CACHE,
		plugins: [new workbox.expiration.Plugin({
		  maxEntries: 1,
		  maxAgeSeconds: 30 * 60 // 30 minutes
		})]
	  }));
  
	  var articleApiHandler = workbox.strategies.staleWhileRevalidate({
		cacheName: ARTICLE_API_CACHE,
		plugins: [new workbox.expiration.Plugin({
		  maxEntries: 50,
		  maxAgeSeconds: 24 * 60 * 60 // 1day
		}), new workbox.cacheableResponse.Plugin({
		  statuses: [200]
		})]
	  });
  
	  workbox.routing.registerRoute(/(.*)\/api_articleshow\.cms/, function (args) {
		return articleApiHandler.handle(args).then(function (response) {
		  if (response.status === 404) {
			return caches.match('404.html');
		  } else {
			return response;
		  }
		}).catch(function (ex) {
		  return caches.match('500.html');
		});
	  });
  
	  workbox.routing.registerRoute(/(.*)\/img\//, workbox.strategies.cacheFirst({
		cacheName: IMAGE_CACHE,
		plugins: [new workbox.expiration.Plugin({
		  maxEntries: 50,
		  maxAgeSeconds: 31536000 // 1 year
		})]
	  }));
  
	  workbox.routing.registerRoute(/(.*)\/css\//, workbox.strategies.cacheFirst({
		cacheName: CSS_CACHE,
		plugins: [new workbox.expiration.Plugin({
		  maxEntries: 3,
		  maxAgeSeconds: 31536000 // 1 year
		})]
	  }));
  
	  
	  //commenting this to fix samsung pg issue of caching 
	 /* workbox.routing.registerRoute(
		new RegExp('/english(.*)/'),
		async ({event}) => {
		  try {
			return await workbox.strategies.cacheFirst().handle({event});
		  } catch (error) {
			return caches.match("/offline.html");
		  }
		}
	  );*/
  
  
	  self.addEventListener('install', function (event) {
		//console.log('Inside Install');
		var urls = ['/'];
		var cacheName = HOME_HTML_CACHE; //workbox.core.cacheNames.runtime
		event.waitUntil(caches.open(cacheName).then(function (cache) {
		  return cache.addAll(urls).then(function (data) {}).catch(function (error) {
			self.skipWaiting();
		  });
		}));
		return event.waitUntil(self.skipWaiting());
	  });
  
	  self.addEventListener('activate', function (event) {
		//event.waitUntil(self.clients.claim()); // Become available to all pages 
		// this is to fix samsung pg issue of caching removing old cache 
		event.waitUntil(
		  caches.keys().then(function(cacheNames) {
			return Promise.all(
			  cacheNames.map(function(cacheName) {
				  if(cacheName.indexOf('runtime') != -1) {
					console.log('Deleting out of date cache:', cacheName);
					return caches.delete(cacheName);
				  }
			  })
			);
		  })
		);
		//console.log('keyys', caches.keys());
	  });
  
	  self.addEventListener('sync', function (event) {
		if (event.tag == 'syncHomePage') {
		  event.waitUntil(cacheAllHomePageApi());
		}
	  });
  
	  workbox.routing.registerRoute(/https:\/\/www.newspointapp.com\/photo/, workbox.strategies.cacheFirst({
		cacheName: "static-resources-photo",
		plugins: [new workbox.cacheableResponse.Plugin({
		  statuses: [200]
		}), new workbox.expiration.Plugin({
		  maxEntries: 100,
		  maxAgeSeconds: 30 * 24 * 60 * 60 // 30d
		})]
	  }), 'GET');
  
	  workbox.routing.registerRoute(/https:\/\/www.newspointapp.com\/img/, workbox.strategies.cacheFirst({
		cacheName: "static-resources-img",
		plugins: [new workbox.cacheableResponse.Plugin({
		  statuses: [200]
		}), new workbox.expiration.Plugin({
		  maxEntries: 100,
		  maxAgeSeconds: 30 * 24 * 60 * 60 // 30d
		})]
	  }), 'GET');
  
	  self.addEventListener('message', function (event) {
		var jsArray = event.data.map(function (js) {
		  fetch(js);
		});
		Promise.all(jsArray).then(function (data) {
		  return event.ports[0].postMessage("SW Says 'Hello back!'");
		}, function (error) {
		  return event.ports[0].postMessage("SW Says 'Hello back Error!'");
		});      
	  });
  
	})();
  } else {
	//console.log('Boo! Workbox didn\'t load 😬');
  }
self.addEventListener('install', function(event) {
	// pre cache a load of stuff:
	event.waitUntil(
		caches.open('testing').then(function(cache) {
			return cache.addAll([
				'/TestServiceWorker/js/test.js'
			]);
		})
	)
});
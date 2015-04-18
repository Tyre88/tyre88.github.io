self.addEventListener('install', function(event) {
	cache.put('/TestServiceWorker/js/test.js', function(response)
	{
		console.log(response);
	});
	// pre cache a load of stuff:
	event.waitUntil(
		caches.open('testing').then(function(cache) {
			return cache.addAll([
				'/TestServiceWorker/js/test.js'
			]);
		})
	)
});
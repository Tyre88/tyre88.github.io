function initialiseState()
{
	if(!('showNotification' in ServiceWorkerRegistration.prototype))
	{
		console.warn('Notifications aren\'t supported.');
		return;
	}

	if(Notification.permission === 'denied')
	{
		console.warn('The user has blocked notifications');
		return;
	}

	/*if(!('PushManager' in window))
	{
		console.warn('Push messaging isn\'t supported.');
		return;
	}*/

	navigator.serviceWorker.ready.then(function(serviceWorkerRegistration)
	{
		serviceWorkerRegistration.pushManager.getSubscription()
			.then(function(subscription)
			{
				if(!subscription)
					return;

				sendSubscriptionToServer(subscription);
			})
	}).catch(function(err)
	{
		console.warn('Error during getSubscription()', err);
	});
}

function subscribe()
{
	navigator.serviceWorker.ready.then(function(serviceWorkerRegistration)
	{
		self.addEventListener('push', function(event) {
			console.log('Received a push message', event);

			var title = 'Yay a message.';
			var body = 'We have received a push message.';
			var icon = '/images/icon-192x192.png';
			var tag = 'simple-push-demo-notification-tag';

			event.waitUntil(
				self.registration.showNotification(title, {
					body: body,
					icon: icon,
					tag: tag
				})
			);
		});

		return serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true});
	});
}
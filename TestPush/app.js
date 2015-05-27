angular.module('push', ["ng", "ngMaterial"]);

angular.module('push').service('sendPush', ["$http", function($http)
{
	this.SendNotification = function(subscriptionId)
	{
		$http.post("https://android.googleapis.com/gcm/send", {registration_ids: [subscriptionId]}, {
			headers:
			{
				'Authorization': "key=AIzaSyC1A1n6Lpj0hcnZON0rZ-SaLmJx4KyL6o8",
				'Content-Type': 'application/json'
			}
		})
	};
}]);

angular.module('push').controller('index', ["$scope", "sendPush", function($scope, sendPush)
{
	$scope.isPushEnabled = false;
	$scope.SubscriptionId = "";

	$scope.TogglePush = function()
	{
		if($scope.isPushEnabled)
		{
			$scope.Subscribe();
		}
		else
		{
			$scope.Unsubscribe();
		}
	};

	$scope.SendNotification = function()
	{
		sendPush.SendNotification($scope.SubscriptionId);
	};

	$scope.Subscribe = function ()
	{
		navigator.serviceWorker.ready.then(function(serviceWorkerRegistration)
		{
			serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
				.then(function(subscription)
				{
					$scope.isPushEnabled = true;
					$scope.SubscriptionId = subscription.subscriptionId;

					//return sendSubscriptionToServer(subscription);
				})
				.catch(function(err)
				{
					if (Notification.permission === 'denied') {
						window.Demo.debug.log('Permission for Notifications was denied');
					}
					else
					{
						window.Demo.debug.log('Unable to subscribe to push.', err);
					}
				});
		})
	};

	$scope.Unsubscribe = function()
	{

	};

	$scope.InitializeState = function()
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

		if(!('PushManager' in window))
		{
			console.warn('Push messaging isn\'t supported.');
			return;
		}

		navigator.serviceWorker.ready.then(function(serviceWorkerRegistration)
		{
			serviceWorkerRegistration.pushManager.getSubscription()
				.then(function(subscription)
				{
					if(!subscription)
						return;

					//sendSubscriptionToServer(subscription);
				})
		}).catch(function(err)
		{
			console.warn('Error during getSubscription()', err);
		});
	};

	if('serviceWorker' in navigator)
	{
		navigator.serviceWorker.register('service-worker.js').then($scope.InitializeState);
	}
	else
	{
		console.warn('Service workers aren\'t supported in this browser');
	}

}]);
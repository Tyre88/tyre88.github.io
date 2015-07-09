﻿self.addEventListener('push', function (event) {
    console.log('Received a push message', event);

    var title = 'Test push notification...';
    var body = 'Test message....';
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


self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    event.waitUntil(
        clients.matchAll({type: 'window'}).then(function(clientList) {
            for(var i = 0; i < clientList.length; i++)
            {
                var client = clientList[i];
                if(client.url == '/TestPush2/' && 'focus' in client)
                    return client.focus();
            }

            if(clients.openWindow)
            {
                return clients.openWindow('/TestPush2/');
            }
        })
    )
});
/* SERVICE WORKER TEST */

function InitializeServiceWorker() {
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.warn('Notifications aint supported.');
        return;
    }

    if (Notification.permission == 'denied') {
        console.warn('The user have blocked the permissions');
        return;
    }

    if (!('PushManager' in window)) {
        console.warn('Push messages aint supported.');
        return;
    }

    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                if (!subscription) {
                    console.warn('No subscription');
                    return;
                }
            });
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('notification-worker.js').then(InitializeServiceWorker);
}
else {
    console.warn('Service workers aint supported in the browser...');
}

function SubscribeToNotifications() {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
            .then(function (subscription) {
                debugger;
                console.log('Subscribed!', subscription);
                console.log(subscription.subscriptionId);
                $("body").append(JSON.stringify(subscription));
            })
            .catch(function (err) {
                if (Notification.permission == 'denied') {
                    console.warn('The user have blocked the permissions')
                }
                else {
                    console.warn('Unable to subscribe...', err);
                }
            });
    });
}

$("#chkPushNotification").on('change', function () {
    SubscribeToNotifications();
}); 
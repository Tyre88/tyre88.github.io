var BizFcmNotification = function () {
    var firebaseMessaging = undefined;
    this.config = {
        apiKey: "AIzaSyAW520uM1as_CQG-0y-8Ou2L_fIsbUiFVM",
        authDomain: "samsungplus-cb236.firebaseapp.com",
        databaseURL: "https://samsungplus-cb236.firebaseio.com",
        storageBucket: "samsungplus-cb236.appspot.com",
        messagingSenderId: "532586033857"
    };
    this.isInitialized = false;

    BizFcmNotification.prototype.initialize = function () {
        firebase.initializeApp(this.config);
        firebaseMessaging = firebase.messaging();
        firebaseMessaging.onMessage(OnMessage);

        this.isInitialized = true;
    };

    BizFcmNotification.prototype.requestPermission = function () {
        var promise = jQuery.Deferred();

        if (!this.isInitialized) {
            console.warn('You need to initialize first.');
            return;
        }

        firebaseMessaging.requestPermission()
            .then(function () {
                console.log('Have permission');
                firebaseMessaging.getToken().then(function (token) {
                    $.ajax({
                        url: "/WS/BizPartScriptService.asmx/AddPushNotificationId",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ notificationId: token }),
                        success: function() {
                            promise.resolve(token);
                        }
                    });
                });
            })
            .catch(function (err) {
                console.warn('Error: ', err);
                promise.reject(err);
            });

        return promise;
    };

    BizFcmNotification.prototype.getToken = function() {
        var promise = jQuery.Deferred();

        firebaseMessaging.getToken().then(function(token) {
            promise.resolve(token);
        }).catch(function(err) {
            console.error(err);
            promise.reject(err);
        });

        return promise;
    };

    function OnMessage(payload) {
        console.log('onMessage', payload);
    }
};

var BizUserNotification = new BizFcmNotification();

(function () {
    BizUserNotification.initialize();
    BizUserNotification.getToken().then(function(token) {
        console.log(token);
    }).catch(function(err) {
        debugger;
        BizUserNotification.requestPermission().then(function (token) {
            console.log(token);
        });
    })
}());

//OLD CODE
//(function() {
//    BizUserNotification.OnLoad = OnLoad;
//    BizUserNotification.InitialiseState = InitialiseState;
//    BizUserNotification.SubscribeToNotifications = SubscribeToNotifications;
//    BizUserNotification.StoreSubscription = StoreSubscription;
//    BizUserNotification.OpenDbConnection = OpenDbConnection;
//    BizUserNotification.AddToIndexedDatabase = AddToIndexedDatabase;
//    BizUserNotification.IsPushEnabledInBrowser = IsPushEnabledInBrowser;
//    BizUserNotification.IsServiceworkerEnabledInBrowser = IsServiceworkerEnabledInBrowser;
//    BizUserNotification.HasPushSubscription = HasPushSubscription;
//    BizUserNotification.UnSubscribeToNotifications = UnSubscribeToNotifications;

//    BizUserNotification.userNotificationDb = undefined;

//    window.addEventListener('load', BizUserNotification.OnLoad);

//    function OnLoad() {
//        if(BizUserNotification.IsServiceworkerEnabledInBrowser())
//        {
//            setTimeout(function() {
//                navigator.serviceWorker.register(siteRootPath + "UserNotificationWorker.js").then(BizUserNotification.InitialiseState);
//            }, 1000);
//        }
//        else
//        {
//            console.warn('Service workers aren\'t supported in this browser.');
//        }
//    }

//    function InitialiseState() {

//        if(BizUserNotification.IsPushEnabledInBrowser())
//        {
//            BizUserNotification.HasPushSubscription().then(function(subscription) {
//                if(subscription != undefined)
//                {
//                    BizUserNotification.StoreSubscription(subscription);
//                    console.log(subscription);
//                }
//            });

//            navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
//                serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription) {
//                    if(!subscription)
//                        return;

//                    BizUserNotification.StoreSubscription(subscription);
//                    console.log(subscription);
//                });
//            }).catch(function(err) {
//                console.warn('Error during getSubscription()', err);
//            });
//        }
//    }

//    function SubscribeToNotifications() {
//        var defer = $.Deferred();
//        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
//            serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly:true}).then(function(subscription) {
//                BizUserNotification.StoreSubscription(subscription, true).then(function(response) {
//                    defer.resolve(response);
//                });
//            });
//        }).catch(function(e) {
//            if (Notification.permission === 'denied') {
//                console.warn('Permission for Notifications was denied');
//            } else {
//                console.error('Unable to subscribe to push.', e);
//            }

//            defer.resolve();
//        });
//        return defer.promise();
//    }

//    function StoreSubscription(subscription, storeInDatabase) {
//        var defer = $.Deferred();
//        var subId = subscription.endpoint.replace('https://android.googleapis.com/gcm/send/', '');
//        if(typeof(Storage) !== "undefined") {
//            localStorage.setItem("UserNotificationSubscriptionId", subId);
//        }

//        BizUserNotification.AddToIndexedDatabase(subId);

//        if(storeInDatabase)
//        {
//            $.ajax({
//                url: "/WS/BizPartScriptService.asmx/AddPushNotificationId",
//                type: "POST",
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                data: JSON.stringify({ notificationId: subId }),
//                success: function(response) {
//                    defer.resolve(response);
//                }
//            });
//        }
//        else
//            defer.resolve();

//        return defer.promise();
//    }

//    function OpenDbConnection()
//    {
//        var defer = $.Deferred();

//        window.indexedDB.deleteDatabase("UserNotifications");
//        var dbRequest = window.indexedDB.open('UserNotifications', 4);

//        dbRequest.onsuccess = function() {
//            BizUserNotification.userNotificationDb = dbRequest.result;
//            defer.resolve();
//        };

//        dbRequest.onerror = function (evt) {
//            console.log("IndexedDB error: " + evt.target.errorCode);
//            defer.reject();
//        };

//        dbRequest.onupgradeneeded = function (evt) {
//            var objectStore = evt.currentTarget.result.createObjectStore("UserNotificationSubscriptions",
//                { keyPath: "id", autoIncrement: true });

//            objectStore.createIndex("subscriptionId", "subscriptionId", { unique: true });
//        };

//        return defer.promise();
//    }

//    function AddToIndexedDatabase(senderId)
//    {
//        BizUserNotification.OpenDbConnection().then(function() {
//            console.log(senderId);
//            var transaction = BizUserNotification.userNotificationDb.transaction(["UserNotificationSubscriptions"], "readwrite");
//            var store = transaction.objectStore("UserNotificationSubscriptions");
//            var request = store.add({subscriptionId: senderId});

//            request.onerror = function(e) {
//                console.log("Error",e.target.error.name);
//                BizUserNotification.userNotificationDb.close();
//            };

//            request.onsuccess = function(e) {
//                console.log("Woot! Did it");
//                BizUserNotification.userNotificationDb.close();
//            };
//        });
//    }

//    function IsPushEnabledInBrowser() {
//        if (typeof ServiceWorkerRegistration === "undefined")
//            return false;

//        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
//            console.warn('Notifications aren\'t supported.');
//            return false;
//        }

//        if (Notification.permission === 'denied') {
//            console.warn('The user has blocked notifications.');
//            return false;
//        }

//        if (!('PushManager' in window)) {
//            console.warn('Push messaging isn\'t supported.');
//            return false;
//        }

//        return true;
//    }

//    function IsServiceworkerEnabledInBrowser() {
//        return 'serviceWorker' in navigator;
//    }

//    function HasPushSubscription() {
//        var defer = $.Deferred();

//        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
//            serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription) {
//                defer.resolve(subscription);
//            });
//        }).catch(function(err) {
//            console.warn('Error during getSubscription()', err);
//            defer.resolve(undefined);
//        });

//        return defer.promise();
//    }

//    function UnSubscribeToNotifications() {
//        var defer = $.Deferred();
//        BizUserNotification.HasPushSubscription().then(function(subscription) {
//            if(!subscription)
//            {
//                return;
//            }

//            var subId = subscription.endpoint.replace('https://android.googleapis.com/gcm/send/', '');

//            subscription.unsubscribe().then(function(success) {
//                console.log("Success", success);
//                $.ajax({
//                    url: "/WS/BizPartScriptService.asmx/RemovePushNotificationId",
//                    type: "POST",
//                    contentType: "application/json; charset=utf-8",
//                    dataType: "json",
//                    data: JSON.stringify({ notificationId: subId }),
//                    success: function(response) {
//                        defer.resolve(response);
//                    }
//                });
//            }).catch(function(e) {
//                console.warn("error unsubscribing....");
//                defer.resolve();
//            })
//        });
//        return defer.promise();
//    }
//}());

//if(BizUserNotification.IsServiceworkerEnabledInBrowser() || BizUserNotification.IsPushEnabledInBrowser())
//{
//    console.log("Service worker enabled...");
//}
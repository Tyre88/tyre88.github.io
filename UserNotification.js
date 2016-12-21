var BizFcmNotification = function () {
    var firebaseMessaging = undefined;
    this.config = {
        apiKey: "AIzaSyCoa9WPA8Fff5bfsDOQS9ye4wsV8ECIeHY",
        messagingSenderId: "225620038376"
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

    BizFcmNotification.prototype.removeSubscription = function() {
        var promise = jQuery.Deferred();
        firebaseMessaging.getToken().then(function(token) {
            firebaseMessaging.deleteToken(token).then(function() {
                $.ajax({
                    url: "/WS/BizPartScriptService.asmx/RemovePushNotificationId",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({ notificationId: token }),
                    success: function(response) {
                        promise.resolve(response);
                    }
                });
            });
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
    BizUserNotification.getToken().done(function(token) {
        if(token == null) {
            BizUserNotification.requestPermission().then(function (token) {
                console.log(token);
            });
        }
        console.log(token);
    }).fail(function(err) {
        BizUserNotification.requestPermission().then(function (token) {
            console.log(token);
        });
    })
}());
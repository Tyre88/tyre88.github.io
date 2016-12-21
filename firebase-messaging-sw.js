importScripts("https://www.gstatic.com/firebasejs/3.6.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.6.2/firebase-messaging.js");

var config = {
    apiKey: "AIzaSyCoa9WPA8Fff5bfsDOQS9ye4wsV8ECIeHY",
    messagingSenderId: "225620038376"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(MessageHandler);

function MessageHandler(payload) {
    const title = payload.data.title;
    const options = {
        body: payload.data.body,
        icon: payload.data.icon,
        tag: payload.data.tag,
        data: {
            url: payload.data.url
        }
    };
    return self.registration.showNotification(title, options);
}
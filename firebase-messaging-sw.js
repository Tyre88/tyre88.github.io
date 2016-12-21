importScripts("https://www.gstatic.com/firebasejs/3.6.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.6.2/firebase-messaging.js");

var config = {
    apiKey: "AIzaSyAW520uM1as_CQG-0y-8Ou2L_fIsbUiFVM",
    authDomain: "samsungplus-cb236.firebaseapp.com",
    databaseURL: "https://samsungplus-cb236.firebaseio.com",
    storageBucket: "samsungplus-cb236.appspot.com",
    messagingSenderId: "532586033857"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
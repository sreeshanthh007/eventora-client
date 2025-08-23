importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA0h6QwzFyfUOMNHNM3Fcaq_A3muD2uQ6w",
  authDomain: "eventoranotifications.firebaseapp.com",
  projectId: "eventoranotifications",
  storageBucket: "eventoranotifications.firebasestorage.app",
  messagingSenderId: "954524184102",
  appId: "1:954524184102:web:b1614a5d8bda2a926c00e7",
  measurementId: "G-XRF1N0XRNB"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Received background message ", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "./EVENRORA.png"
  });
});

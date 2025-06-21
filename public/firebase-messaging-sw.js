importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBWZVSe6u1J3WM8WXZ-s3ibRIJEkHhBMQk',
  authDomain: 'dreamelevenclone.firebaseapp.com',
  projectId: 'dreamelevenclone',
  storageBucket: 'dreamelevenclone.appspot.com',
  messagingSenderId: '438326678548',
  appId: '1:438326678548:web:df3d8f83998c66c3ef4301',
  measurementId: 'G-SC62SMG6E5',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './abd.jpeg', // Replace with your app's icon
    sound: './ipl.mp3',
    data: {
      url: "https://dream-11-clone-nu.vercel.app"
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Handle notification clicks — MUST be outside `onBackgroundMessage`
self.addEventListener('notificationclick', function (event) {
  const urlToOpen = event.notification.data?.url || "https://dream-11-clone-nu.vercel.app";
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
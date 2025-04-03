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
    icon: './logo192.png', // Replace with your app's icon
    sound: './ipl.mp3'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
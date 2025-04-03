import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = initializeFirestore(app, { experimentalForceLongPolling: true });

// Initialize Storage
export const storage = getStorage(app);

// Initialize Firebase Cloud Messaging
export const messaging = getMessaging(app);

/**
 * Request notification permission and get FCM token
 * @returns {Promise<string|null>} FCM token or null if permission is denied
 */
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const token = await getToken(messaging, {
        vapidKey: 'BL6FACPOW1YQ3kP2Jl6GdGADFaRDjLq4m_84bKP_myz_Raa5FjwaNN-34IQkoRuEMWN44W3_6PunzCbC8IqWnZ4', // Replace with your VAPID key from Firebase Console
      });
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('Notification permission denied.');
      return null;
    }
  } catch (error) {
    console.error('Error getting notification permission:', error);
    return null;
  }
};

/**
 * Listener for foreground messages
 * @returns {Promise<Object>} Resolves with the payload of the message
 */
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export default app;

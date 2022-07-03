import { initializeFirestore } from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDx7nA0CFdUDgkDrfTT0jcEcGNQUW3ADHM',
  authDomain: '469419712980-hekf24k85f7os8k011iare1qrs543jph.apps.googleusercontent.com',
  projectId: 'vcom-363c0',
  storageBucket: 'vcom-363c0.appspot.com',
  messagingSenderId: '469419712980',
  appId: '1:469419712980:android:12da5d93c358b93536f641',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };
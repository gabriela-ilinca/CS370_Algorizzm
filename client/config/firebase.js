import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Constants from 'expo-constants';
import socket from './socket';
const socketClient = socket;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

const firebase_auth = getAuth(firebase_app);


const fetchUnsentMessages = async (userID) => {
  try {
    const response = await fetch(`${Constants.expoConfig?.extra?.apiUrl}/api/message/unsent?userID=${userID}`);

    if (!response.ok) {
      throw new Error('Failed to retrieve messages');
    }
    const messages = await response.json();
    return messages;
  } catch (error) {
    console.error(error);
  }
}

onAuthStateChanged(firebase_auth, async (user) => {
  if (user) {
    //when user is connected(signup/login or logged in from prev session and opening app) then connect to socket
    //after connecting to socket initialize sqlite
    try {
      socketClient.auth = { userID: firebase_auth.currentUser.uid };
      socketClient.connect();
      console.log("SUCCESS");
    } catch (error) {
      console.error('Error connecting to socket:', error);
    }

  }
});

socket.on('reconnect_attempt', (attemptNumber) => {
  console.log(`Reconnection attempt: ${attemptNumber}`);
  socket.auth = { userID: firebase_auth.currentUser.uid};
});

export { firebase_auth };


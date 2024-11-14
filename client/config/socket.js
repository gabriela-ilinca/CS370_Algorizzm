import { io } from 'socket.io-client';
//import { firebase_auth } from './firebase';
import Constants from 'expo-constants';
import { store } from '../store';
import { setConversations } from '../slices/conversationSlice';

//const auth = firebase_auth;

const socket = io(Constants.expoConfig?.extra?.apiUrl, {
    autoConnect: false
});

socket.onAny((eventName, ...args) => {
    console.log(eventName, args);
});


export default socket;
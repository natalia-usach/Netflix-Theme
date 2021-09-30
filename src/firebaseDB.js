import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAzJAhvbpFWDQnCQ1tWZ9b3iba3iPwmAGk",
    authDomain: "your-magic-tv-72435.firebaseapp.com",
    databaseURL: "https://your-magic-tv-72435-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "your-magic-tv-72435",
    storageBucket: "your-magic-tv-72435.appspot.com",
    messagingSenderId: "1083938105746",
    appId: "1:1083938105746:web:20c8d3a256e8ef8d1c394b"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();

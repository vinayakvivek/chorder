import firebase from 'firebase';
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyB3LWlKBG0TTWwMDGdBT_3wa1gBzx5T86s",
  authDomain: "chorder-cf7cc.firebaseapp.com",
  databaseURL: "https://chorder-cf7cc-default-rtdb.firebaseio.com",
  projectId: "chorder-cf7cc",
  storageBucket: "chorder-cf7cc.appspot.com",
  messagingSenderId: "453062768263",
  appId: "1:453062768263:web:27b476ec0d2ed4bca62a22"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

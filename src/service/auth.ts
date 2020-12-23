import { firebaseConfig } from '../config';
import { userStore } from '../stores/user';
import firebase from 'firebase/app';
import 'firebase/auth';

export const initialize = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(user => {
    userStore.updateData(user);
  });
}

export const googleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleProvider).then((res) => {
    console.log('Logged in');
  }).catch((error) => {
    console.error(error.message);
  })
}

export const signOut = async () => {
  await firebase.auth().signOut();
}

import firebase from 'firebase';

export const googleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleProvider).then((res) => {
    console.log(res.user);
  }).catch((error) => {
    console.log(error.message);
  })
}

export const signOut = () => {
  firebase.auth().signOut();
}
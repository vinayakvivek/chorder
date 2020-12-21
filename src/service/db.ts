import { Song } from '../models/song';
import firebase from 'firebase';
import { userStore } from '../stores/user';


export const createSong = (song: Song) => {
  const uid = userStore.userId;
  const db = firebase.firestore();
  const data = JSON.parse(JSON.stringify(song));
  db.collection('users').doc(uid).collection('songs').add(data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err.message);
    });
}
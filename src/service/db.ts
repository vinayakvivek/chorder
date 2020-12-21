import { Song } from '../models/song';
import firebase from 'firebase';
import { userStore } from '../stores/user';

const userRef = () => {
  const db = firebase.firestore();
  return db.collection('users').doc(userStore.userId);
}

const songsRef = () => {
  return userRef().collection('songs');
}

export const createSong = (song: Song) => {
  const uid = userStore.userId;
  const data = song.toJson();
  // const s = Song.fromJson(data);
  // console.log(s);
  songsRef().add(data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err.message);
    });
}

export const getAllSongs = async () => {
  const snapshot = await songsRef().get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', Song.fromJson(doc.id, doc.data()));
  });
}
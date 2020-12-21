import { Song } from '../models/song';
import firebase from 'firebase';
import { userStore } from '../stores/user';
import { serviceStore } from '../stores/service';

const userRef = () => {
  const db = firebase.firestore();
  return db.collection('users').doc(userStore.userId);
}

const songsRef = () => {
  return userRef().collection('songs');
}

export const createSong = (song: Song) => {
  const data = song.toJson();
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
  const songs: Song[] = [];
  snapshot.forEach(doc => {
    songs.push(Song.fromJson(doc.id, doc.data()));
  });
  serviceStore.setAllSongs(songs);
}
import { Song } from '../models/song';
import { userStore } from '../stores/user';
import { serviceStore } from '../stores/service';
import firebase from 'firebase/app';
import 'firebase/firestore';

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

export const getSong = async (id: string): Promise<Song> => {
  const doc = await songsRef().doc(id).get();
  return Song.fromJson(doc.id, doc.data());
}

export const saveSong = async (song: Song) => {
  try {
    await songsRef().doc(song.id).set(song.toJson());
    return null;
  } catch (err) {
    return err.message;
  }
}

export const deleteSong = async (id: string) => {
  try {
    await songsRef().doc(id).delete();
    return null;
  } catch (err) {
    return err.message;
  }
}
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
  const docs: any[] = [];
  snapshot.forEach(doc => {
    docs.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  docs.forEach(d => d.serverTimestamp = d.serverTimestamp || 0);  // for backward compatibility
  docs.sort((a, b) => (a.serverTimestamp < b.serverTimestamp) ? 1 : -1)
  const songs = docs.map(d => Song.fromJson(d.id, d));
  serviceStore.setAllSongs(songs);
}

export const getSong = async (id: string): Promise<Song> => {
  const doc = await songsRef().doc(id).get();
  return Song.fromJson(doc.id, doc.data());
}

export const saveSong = async (song: Song) => {
  try {
    const data: any = song.toJson();
    data.serverTimestamp = new Date().getTime();
    await songsRef().doc(song.id).set(data);
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
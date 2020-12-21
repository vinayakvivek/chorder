import { makeAutoObservable } from 'mobx';
import { Bar } from '../models/bar';
import { Chord, createAllChords } from '../models/chord';
import { Line } from '../models/line';
import { Song } from '../models/song';
import { v4 as uuidv4 } from 'uuid';

class ServiceStore {

  id: string = '';

  allChords: Chord[] = [];

  allSongs: Song[];

  song: Song;

  songView: boolean = false;

  refreshCounter: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.allChords = createAllChords();
    this.allSongs = [];
    this.song = this.createSampleSong();
  }

  createSampleSong() {
    const sampleBar = new Bar([
      new Chord('C'),
      new Chord('Dm'),
      new Chord('f#'),
      new Chord('% '),
    ]);
    const sampleBar2 = new Bar([
      new Chord('Amsus4'),
      new Chord('C#'),
    ]);
    const sampleLine = new Line([ sampleBar, sampleBar2 ], 1);
    return new Song(uuidv4(), "My song", [sampleLine]);
  }

  setAllSongs(songs: Song[]) {
    this.allSongs = songs;
  }

  createSong() {
    this.song = new Song(uuidv4(), "My song", []);
  }

  setSong(song: Song) {
    this.song = song;
  }

  showSongList() {
    this.songView = false;
  }

  showSongData() {
    this.songView = true;
  }

  transpose(up: boolean = true) {
    this.song = this.song.transpose(up);
  }

  setId(id: string) {
    this.id = id;
  }

  refresh() {
    this.refreshCounter++;
  }
}

export const serviceStore = new ServiceStore();

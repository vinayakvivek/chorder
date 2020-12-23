import { makeAutoObservable } from 'mobx';
import { Bar } from '../models/bar';
import { Chord, createAllChords, scaleChordLabels } from '../models/chord';
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
    return new Song(uuidv4(), "My song", [sampleLine], new Chord('A'), 80);
  }

  setAllSongs(songs: Song[]) {
    this.allSongs = songs;
  }

  createSong() {
    this.setSong(new Song(uuidv4(), "My song", [], new Chord('C'), 80));
  }

  setSong(song: Song) {
    this.song = song;
    this.updateScaleChords();
  }

  updateScaleChords() {
    const scaleChords = scaleChordLabels(this.song.scale).map(cl => {
      const c = new Chord(cl);
      c.inScale = true;
      return c;
    });
    this.allChords.splice(2, scaleChords.length, ...scaleChords);

    // this.allChords.forEach(c => c.inScale = scaleChords.includes(c.label));
    this.allChords[0].inScale = true;
    this.allChords[1].inScale = true;
    // this.allChords = [
    //   ...this.allChords.filter(c => c.inScale),
    //   ...this.allChords.filter(c => !c.inScale),
    // ];
  }

  showSongList() {
    this.songView = false;
  }

  showSongData() {
    this.songView = true;
  }

  transpose(up: boolean = true) {
    this.setSong(this.song.transpose(up));
  }

  setId(id: string) {
    this.id = id;
  }

  refresh() {
    this.refreshCounter++;
  }
}

export const serviceStore = new ServiceStore();

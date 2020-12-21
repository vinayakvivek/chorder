import { makeAutoObservable } from 'mobx';
import { Bar } from '../models/bar';
import { Chord, ChordType, createAllChords } from '../models/chord';
import { Line } from '../models/line';
import { Song } from '../models/song';

class ServiceStore {

  id: string = '';

  allChords: Chord[] = [];

  song: Song;

  refreshCounter: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.allChords = createAllChords();
    const sampleBar = new Bar([
      new Chord(0, ChordType.major),
      new Chord(5, ChordType.minor),
      new Chord(2, ChordType.minor),
      new Chord(0, ChordType.empty),
    ]);
    const sampleBar2 = new Bar([
      new Chord(0, ChordType.major),
      new Chord(6, ChordType.minor),
    ]);
    const sampleLine = new Line([ sampleBar, sampleBar2 ], 1);
    this.song = new Song("My song", [sampleLine]);
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

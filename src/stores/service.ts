import { makeAutoObservable } from 'mobx';
import { Chord, ChordType, createAllChords } from '../models/chord';
import { Bar, Line } from '../models/song';

class ServiceStore {

  id: string = '';

  allChords: Chord[] = [];

  sampleLine: Line;

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
    this.sampleLine = new Line([ sampleBar, sampleBar2 ], 1);
  }

  setId(id: string) {
    this.id = id;
  }

  refresh() {
    this.refreshCounter++;
  }
}

export const serviceStore = new ServiceStore();

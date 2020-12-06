import { action, observable } from 'mobx';
import { Chord, ChordType, createAllChords } from '../models/chord';
import { Bar } from '../models/song';

class ServiceStore {

  @observable
  id: string = '';

  @observable
  allChords: Chord[] = [];

  @observable
  sampleBar: Bar;

  constructor() {
    this.allChords = createAllChords();
    this.sampleBar = new Bar([
      new Chord(0, ChordType.major),
      new Chord(5, ChordType.minor),
      new Chord(2, ChordType.minor),
      new Chord(0, ChordType.empty),
    ]);
  }

  @action
  setId(id: string) {
    this.id = id;
  }
}

export const serviceStore = new ServiceStore();

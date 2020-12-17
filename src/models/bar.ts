import { Chord } from './chord';

export class Bar {

  chords: Chord[] = [];

  constructor(chords: Chord[]) {
    this.chords = chords;
  }

  static init() {
    return new Bar([
      Chord.init(),
      Chord.init(),
      Chord.init(),
      Chord.init(),
    ]);
  }

  addChord(chord: Chord) {
    this.chords.push(chord);
  }

  removeLastChord() {
    this.chords.pop();
  }
}
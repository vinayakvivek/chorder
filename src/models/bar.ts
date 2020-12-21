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

  transpose(up: boolean = true) {
    return new Bar(this.chords.map(c => c.transpose(up)));
  }

  addChord(chord: Chord) {
    this.chords.push(chord);
  }

  removeLastChord() {
    this.chords.pop();
  }

  static fromJson(data: any) {
    return new Bar(data.chords.map((c: any) => Chord.fromJson(c)));
  }

  toJson() {
    return {
      chords: this.chords.map(c => c.toJson()),
    };
  }
}
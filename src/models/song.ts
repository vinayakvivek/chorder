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

export class Line {

  bars: Bar[] = [];
  repeatCount: number = 0;
  lyrics: string = '';
  showLyrics: boolean;

  constructor(bars: Bar[], repeatCount: number) {
    this.bars = bars;
    this.repeatCount = repeatCount;
    this.showLyrics = false;
  }

  static init() {
    return new Line([Bar.init()], 1);
  }

  toggleShowLyrics() {
    this.showLyrics = !this.showLyrics;
  }

  setLyrics(text: string) {
    this.lyrics = text;
  }

  addBar(bar: Bar) {
    this.bars.push(bar);
  }

  removeLastBar() {
    this.bars.pop();
  }

  removeBar(index: number) {
    this.bars.splice(index, 1);
  }
}

export class Song {

  name: string
  lines: Line[]

  constructor(name: string, lines: Line[]) {
    this.name = name;
    this.lines = lines;
  }

  addLine(line: Line) {
    this.lines.push(line);
  }

  removeLastLine() {
    this.lines.pop();
  }
}
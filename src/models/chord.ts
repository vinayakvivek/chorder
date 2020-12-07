const CHORD_BASES = [
  'A', 'B♭', 'B', 'C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'G#',
]

export enum ChordType {
  major = '',
  minor = 'm',
  empty = 'empty'
}

export class Chord {
  base: number;
  type: ChordType;
  label: string = '';
  isEmpty: boolean;
  inScale: boolean;

  constructor(base: number, type: ChordType, inScale: boolean = false) {
    this.base = base;
    this.type = type;
    this.label = `${CHORD_BASES[base]}${type}`;
    this.isEmpty = type === ChordType.empty;
    if (this.isEmpty) {
      this.label = '-';
    }
    this.inScale = inScale;
  }

  static init() {
    return new Chord(0, ChordType.empty);
  }

  copyFrom(other: Chord) {
    this.base = other.base;
    this.type = other.type;
    this.label = other.label;
    this.isEmpty = other.isEmpty;
  }

  equals(other: Chord) {
    return this.isEmpty === other.isEmpty ||
        (this.base === other.base && this.type === other.type);
  }
}

export const createAllChords = () => {
  const chords: Chord[] = [];
  for (let b = 0; b < CHORD_BASES.length; ++b) {
    chords.push(new Chord(b, ChordType.major, true));
    chords.push(new Chord(b, ChordType.minor));
  }
  chords.push(new Chord(0, ChordType.empty));
  chords.sort((a, b) => {
    if (a.inScale && b.inScale) return 0
    if (a.inScale && !b.inScale) return -1
    return 1
  })
  return chords;
}
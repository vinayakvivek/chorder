const CHORD_BASES = [
  'A', 'B♭', 'B', 'C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'G#',
]

const CHORD_BASE_INDEX: any = {
  'A': 0,
  'B♭': 1, 'A#': 1,
  'B': 2,
  'C': 3,
  'C#': 4, 'D♭': 4,
  'D': 5,
  'E♭': 6, 'D#': 6,
  'E': 7,
  'F': 8,
  'F#': 9, 'G♭': 9,
  'G': 10,
  'G#': 11, 'A♭': 11,
}

export enum ChordType {
  major = '',
  minor = 'm',
  empty = 'empty',
  other = 'other',
}

export class Chord {
  base: number;
  type: string;
  label: string = '';
  isEmpty: boolean;
  inScale: boolean;

  resetLabel() {
    this.label = this.isEmpty ? '' : `${CHORD_BASES[this.base]}${this.type}`;
  }

  constructor(base: number, type: string, inScale: boolean = false) {
    this.base = base;
    this.type = type;
    this.isEmpty = type === ChordType.empty;
    this.inScale = inScale;
    this.resetLabel();
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

  transpose(up: boolean = true) {
    if (this.isEmpty) {
      return this;
    } else {
      const offset = up ? 1 : -1;
      const b = (this.base + offset + CHORD_BASES.length) % CHORD_BASES.length;
      return new Chord(b, this.type);
    }
  }

  updateFromString(label: string) {
    if (label.length < 1) {
      this.isEmpty = true;
      return;
    }

    const base1 = label[0].toUpperCase();
    if (base1 > 'G' || base1 < 'A') {
      this.isEmpty = true;
      return;
    }
    let base = base1;
    if (label.length > 1) {
      if (label[1] === '♭' || label[1] === '#') {
        base += label[1];
      }
    }
    this.base = CHORD_BASE_INDEX[base];
    this.type = label.slice(base.length);
    this.label = base + this.type
    this.isEmpty = false;
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
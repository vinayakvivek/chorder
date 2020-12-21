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

const extractChordPart = (c: string): ChordPart | null => {
  if (!c.length) return null;
  let base = c[0].toUpperCase();
  if (base > 'G' || base < 'A') return { base: '', type: c };
  if (c.length > 1 &&
     (c[1] === '♭' || c[1] === '#')) {
      base += c[1];
  }
  return {
    base,
    type: c.slice(base.length),
  }
}

interface ChordPart {
  base: string,
  type: string,
}

export class Chord {
  label: string = '';
  parts: ChordPart[] = [];

  constructor(label: string) {
    this.label = label.trim() || '-';
    this.initParts();
  }

  resetLabel() {
    this.label = this.parts.map(p => p.base + p.type).join(' ');
  }

  initParts() {
    this.parts = [];
    const strParts = this.label.split(/[ ,]+/);
    for (const p of strParts) {
      const cp = extractChordPart(p);
      if (cp) {
        this.parts.push(cp);
      }
    }
    this.resetLabel();
  }

  static init() {
    return new Chord('');
  }

  copyFrom(other: Chord) {
    this.label = other.label;
    this.initParts();
  }

  transpose(up: boolean = true) {
    const offset = up ? 1 : -1;
    const n = CHORD_BASES.length;
    for (const p of this.parts) {
      if (p.base) {
        p.base = CHORD_BASES[(CHORD_BASE_INDEX[p.base] + offset + n) % n];
      }
    }
    this.resetLabel();
    return new Chord(this.label);
  }

  updateFromString(label: string) {
    this.label = label.trim() || '-';
    this.initParts();
  }

  equals(other: Chord) {
    return this.label === other.label;
  }

  static fromJson(data: any) {
    return new Chord(data.label);
  }

  toJson() {
    return {
      label: this.label,
    };
  }
}

export const createAllChords = () => {
  const chords: Chord[] = [
    new Chord('-'),
    new Chord('%'),
  ];
  const types = ['', 'm', 'sus2', 'sus4', '7', 'M7', 'm7'];
  for (const [key, ] of Object.entries(CHORD_BASE_INDEX)) {
    types.forEach(t => chords.push(new Chord(key + t)));
  }
  return chords;
}

console.log(new Chord('%   P   A# bsus4  '))
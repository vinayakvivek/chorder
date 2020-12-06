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
  isEmpty: boolean = false;

  constructor(base: number, type: ChordType) {
    this.base = base;
    this.type = type;
    this.label = `${CHORD_BASES[base]}${type}`;
    this.isEmpty = type === ChordType.empty;
  }
}

export const createAllChords = () => {
  const chords: Chord[] = [];
  for (let b = 0; b < CHORD_BASES.length; ++b) {
    chords.push(new Chord(b, ChordType.major));
    chords.push(new Chord(b, ChordType.minor));
  }
  return chords;
}
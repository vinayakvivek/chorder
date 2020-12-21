import { Chord } from './chord';
import { Line } from './line';

export class Song {

  id: string;
  name: string;
  lines: Line[];
  scale: Chord;
  tempo: number | null;

  constructor(id: string, name: string, lines: Line[], scale: Chord, tempo: number | null) {
    this.id = id;
    this.name = name;
    this.lines = lines;
    this.scale = scale;
    this.tempo = tempo;
  }

  transpose(up: boolean = true) {
    return new Song(this.id, this.name, this.lines.map(l => l.transpose(up)), this.scale.transpose(up), this.tempo);
  }

  setName(name: string) {
    this.name = name;
  }

  setTempo(tempo: number | null) {
    this.tempo = tempo;
  }

  addLine(line: Line) {
    this.lines.push(line);
  }

  addNewLineAbove(pos: number) {
    this.lines.splice(pos, 0, Line.init());
  }

  removeLine(pos: number) {
    this.lines.splice(pos, 1);
  }

  removeLastLine() {
    this.lines.pop();
  }

  static fromJson(id: string, data: any) {
    return new Song(
      id,
      data.name,
      data.lines.map((l: any) => Line.fromJson(l)),
      Chord.fromJson(data.scale || new Chord('')),
      data.tempo,
    );
  }

  toJson() {
    return {
      name: this.name,
      lines: this.lines.map(l => l.toJson()),
      scale: this.scale.toJson(),
      tempo: this.tempo,
    };
  }
}
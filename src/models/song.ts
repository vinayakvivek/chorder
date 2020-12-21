import { Line } from './line';

export class Song {

  id: string;
  name: string
  lines: Line[]

  constructor(id: string, name: string, lines: Line[]) {
    this.id = id;
    this.name = name;
    this.lines = lines;
  }

  transpose(up: boolean = true) {
    return new Song(this.id, this.name, this.lines.map(l => l.transpose(up)));
  }

  setName(name: string) {
    this.name = name;
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
    return new Song(id, data.name, data.lines.map((l: any) => Line.fromJson(l)));
  }

  toJson() {
    return {
      name: this.name,
      lines: this.lines.map(l => l.toJson()),
    };
  }
}
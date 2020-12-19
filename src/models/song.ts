import { Line } from './line';

export class Song {

  name: string
  lines: Line[]

  constructor(name: string, lines: Line[]) {
    this.name = name;
    this.lines = lines;
  }

  transpose(up: boolean = true) {
    return new Song(this.name, this.lines.map(l => l.transpose(up)));
  }

  setName(name: string) {
    this.name = name;
  }

  addLine(line: Line) {
    this.lines.push(line);
  }

  removeLastLine() {
    this.lines.pop();
  }
}
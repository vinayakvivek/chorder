import { Line } from './line';

export class Song {

  name: string
  lines: Line[]

  constructor(name: string, lines: Line[]) {
    this.name = name;
    this.lines = lines;
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
import { Bar } from './bar';

export class Line {

  bars: Bar[] = [];
  repeatCount: number = 0;
  lyrics: string = '';
  showLyrics: boolean;

  constructor(bars: Bar[], repeatCount: number, showLyrics: boolean = false) {
    this.bars = bars;
    this.repeatCount = repeatCount;
    this.showLyrics = showLyrics;
  }

  static init() {
    // return new Line([Bar.init()], 1);
    return new Line([], 1);
  }

  transpose(up: boolean = true) {
    const line = new Line(this.bars.map(b => b.transpose(up)), this.repeatCount, this.showLyrics);
    line.setLyrics(this.lyrics);
    return line;
  }

  toggleShowLyrics() {
    this.showLyrics = !this.showLyrics;
  }

  setLyrics(text: string) {
    this.lyrics = text;
  }

  setRepeatCount(count: number) {
    this.repeatCount = count;
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

  static fromJson(data: any) {
    const line = Line.init();
    line.bars = data.bars.map((b: any) => Bar.fromJson(b));
    line.repeatCount = data.repeatCount;
    line.lyrics = data.lyrics;
    line.showLyrics = data.showLyrics;
    return line;
  }

  toJson() {
    return {
      bars: this.bars.map(b => b.toJson()),
      repeatCount: this.repeatCount,
      lyrics: this.lyrics,
      showLyrics: this.showLyrics,
    }
  }
}

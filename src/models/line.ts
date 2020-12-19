import { Bar } from './bar';

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
    // return new Line([Bar.init()], 1);
    return new Line([], 1);
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
}

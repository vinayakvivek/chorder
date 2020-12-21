import { Song } from './models/song';

export const exportPdfFile = (name: string, data: any) => {
  try {
    const blob = new Blob([data]);
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    console.error('Error exporting pdf', e);
  }
}


export const generateHtmlFromSong = (song: Song) => {
  let body = '';
  body += `<h1 class="title">${song.name}</h1>`;
  for (const line of song.lines) {
    if (line.bars.length === 0) {
      body += `<div class="line"></div>`;
      continue;
    }
    let lineDiv = '';
    for (const bar of line.bars) {
      lineDiv += `<div class="bar-divider"></div>`;
      const numChords = bar.chords.length;
      for (let i = 0; i < numChords; ++i) {
        let chordLabel = bar.chords[i].label;
        if (i > 0 && chordLabel === bar.chords[i - 1].label) {
          chordLabel = '%';
        }
        if (bar.chords[i].isEmpty) {
          chordLabel = '-';
        }
        lineDiv += `<span class="chord-text">${chordLabel}</span>`;
        if (i < numChords - 1) {
          lineDiv += `<div class="chord-divider"></div>`;
        }
      }
    }
    lineDiv += `<div class="bar-divider"></div>`;
    if (line.repeatCount > 1) {
      lineDiv += `<span class="line-repeat-count">${line.repeatCount}</span>`;
    }
    body += `<div class="line">${lineDiv}</div>`;
    if (line.lyrics) {
      body += `<div class="lyrics">${line.lyrics}</div>`;
    }
  }
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Song</title>
      <style>
        body {
          margin: 50px 50px;
        }

        .title {
          margin-bottom: 30px;
        }

        .line {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
          margin: 20px 0;
          height: 50px;
        }

        .bar-divider {
          display: inline-block;
          height: 100%;
          width: 3px;
          border-left: 2px solid black;
          border-right: 2px solid black;
        }

        .chord-text {
          margin: 0 20px;
          font-size: 1em
        }

        .chord-divider {
          display: inline-block;
          height: 80%;
          border-left: 1px solid black;
        }

        .line-repeat-count {
          padding: 5px;
          margin-left: 50px;
          border: 1px solid grey;
          border-radius: 50%;
        }

        .line-repeat-count:before {
          content: 'x';
        }

        .lyrics {
          margin-bottom: 30px;
        }
      </style>
    </head>
    <body>${body}</body>
    </html>
  `;
}
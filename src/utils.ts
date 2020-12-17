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
  body += `<h1>${song.name}</h1>`;
  for (const line of song.lines) {
    let lineDiv = '';
    for (const bar of line.bars) {
      lineDiv += `<div class="bar-divider"></div>`;
      const numChords = bar.chords.length;
      for (let i = 0; i < numChords; ++i) {
        lineDiv += `<span class="chord-text">${bar.chords[i].label}</span>`;
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

        .line {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
          margin: 20px 0;
        }

        .bar-divider {
          display: inline-block;
          height: 50px;
          width: 3px;
          border-left: 3px solid black;
          border-right: 3px solid black;
        }

        .chord-text {
          margin: 0 20px;
          font-size: xx-large
        }

        .chord-divider {
          display: inline-block;
          height: 40px;
          border-left: 1px solid black;
        }

        .line-repeat-count {
          padding: 5px;
          font-size: x-large;
          margin-left: 50px;
          border: 1px solid grey;
          border-radius: 50%;
        }

        .line-repeat-count:before {
          content: 'x';
        }
      </style>
    </head>
    <body>${body}</body>
    </html>
  `;
}
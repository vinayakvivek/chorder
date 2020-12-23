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
  const scaleLabel = song.scale.isCanonical ? `Scale: ${song.scale.label}` : '';
  const tempoLabel = song.tempo ? `Tempo: ${song.tempo}` : '';
  let subTitle = '';
  if (scaleLabel && tempoLabel)  {
    subTitle = `(${scaleLabel}, ${tempoLabel})`;
  } else if (scaleLabel || tempoLabel) {
    subTitle = `(${scaleLabel || tempoLabel})`;
  }
  // body += `<span class="watermark">MAJOR3</span>`;
  body += `<p class="title"><strong>${song.name}</strong> <span>${subTitle}</span></p>`;
  for (const line of song.lines) {
    if (line.bars.length === 0) {
      body += `
        <div class="line-container">
          <div class="lyrics"></div>
          <div class="line"></div>
        </div/>
      `;
      continue;
    }
    let lineDiv = '';
    for (const bar of line.bars) {
      lineDiv += `<div class="bar-divider"></div>`;
      const numChords = bar.chords.length;
      for (let i = 0; i < numChords; ++i) {
        let chord = bar.chords[i];
        if (chord.parts.length === 1) {
          const p = chord.parts[0];
          lineDiv += `<span class="chord-text">${(p.base + p.type) || '-'}</span>`;
        } else {
          for (const p of chord.parts) {
            lineDiv += `<span class="chord-text chord-text-part">${(p.base + p.type) || '-'}</span>`;
          }
        }
        if (i < numChords - 1) {
          lineDiv += `<div class="chord-divider"></div>`;
        }
      }
    }
    lineDiv += `<div class="bar-divider"></div>`;
    if (line.repeatCount > 1) {
      lineDiv += `<span class="line-repeat-count">${line.repeatCount}</span>`;
    }
    body += `
      <div class="line-container">
        <div class="lyrics">${line.lyrics}</div>
        <div class="line">${lineDiv}</div>
      </div>
    `;
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
          margin: 40px 20px;
        }

        .title {
          font-size: 1.8em;
        }

        .title span {
          font-size: 0.8em;
        }

        .line-container {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }


        .line {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
          margin: 10px 0;
          height: 40px;
        }

        .bar-divider {
          display: inline-block;
          height: 100%;
          width: 3px;
          border-left: 2px solid black;
          border-right: 2px solid black;
        }

        .chord-text {
          margin: 0 10px;
          min-width: 30px;
          text-align: center;
        }

        .chord-text.chord-text-part {
          min-width: 20px;
        }

        .chord-divider {
          display: inline-block;
          height: 100%;
          border-left: 1px solid black;
        }

        .line-repeat-count {
          padding: 5px;
          margin-left: 20px;
          border: 1px solid grey;
          border-radius: 50%;
        }

        .line-repeat-count:before {
          content: 'x';
        }

        .lyrics {
          display: inline-block;
          width: 100px;
          max-width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: clip;
          margin-right: 10px;
        }
      </style>
    </head>
    <body>${body}</body>
    </html>
  `;
}
import { computed, makeAutoObservable } from 'mobx';
import { Chord, createAllChords, scaleChordLabels } from '../models/chord';
import { Song } from '../models/song';

class ServiceStore {

  id: string = '';

  allChords: Chord[] = [];

  scaleChords: Chord[] = [];

  allSongs: Song[];

  song: Song;

  songView: boolean = false;

  refreshCounter: number = 0;

  @computed
  get optionChords() {
    return [
      new Chord('-'),
      new Chord('%'),
      ...this.scaleChords,
      ...this.allChords,
    ];
  }

  constructor() {
    makeAutoObservable(this);
    this.allChords = createAllChords();
    this.allSongs = [];
    this.song = Song.empty();
  }

  setAllSongs(songs: Song[]) {
    this.allSongs = songs;
  }

  createSong() {
    this.setSong(Song.empty());
  }

  setSong(song: Song) {
    this.song = song;
    this.updateScaleChords();
  }

  updateScaleChords() {
    this.scaleChords = scaleChordLabels(this.song.scale).map(cl => new Chord(cl, true));
  }

  showSongList() {
    this.songView = false;
  }

  showSongData() {
    this.songView = true;
  }

  transpose(up: boolean = true) {
    this.setSong(this.song.transpose(up));
  }

  setId(id: string) {
    this.id = id;
  }

  refresh() {
    this.refreshCounter++;
  }
}

export const serviceStore = new ServiceStore();

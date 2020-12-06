import { action, observable } from 'mobx';
import { Chord, createAllChords } from '../models/chord';

class ServiceStore {

  @observable
  id: string = '';

  @observable
  allChords: Chord[] = [];

  constructor() {
    this.allChords = createAllChords();
  }

  @action
  setId(id: string) {
    this.id = id;
  }
}

export const serviceStore = new ServiceStore();

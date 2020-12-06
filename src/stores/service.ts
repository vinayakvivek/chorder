import { action, observable } from 'mobx';

class ServiceStore {

  @observable
  id: string = '';

  @action
  setId(id: string) {
    this.id = id;
  }
}

export const serviceStore = new ServiceStore();

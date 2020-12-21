import { makeAutoObservable } from 'mobx';
import firebase from 'firebase';

class UserStore {

  isSignedIn: boolean = false;

  userId: string = '';

  name: string | null = '';

  email: string | null = '';

  constructor() {
    makeAutoObservable(this);
  }

  updateData(data: firebase.User | null) {
    if (!data) {
      this.reset();
      return;
    }
    this.isSignedIn = true;
    this.userId = data.uid;
    this.name = data.displayName;
    this.email = data.email;
  }

  reset() {
    this.isSignedIn = false;
    this.userId = '';
    this.name = null;
    this.email = null;
  }
}

export const userStore = new UserStore();

import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {

  current_user: any;

  constructor() { }

  setCurrentUser(current_user) {
    this.current_user = current_user;
  }

}

import { Injectable } from '@angular/core';


@Injectable()
export class StorageService {

  public static readValue(key) {
    return localStorage.getItem(key);
  }

  public static writeValues(params) {
    localStorage.setItem(params.key, params.value);
  }

  public static clear() {
    localStorage.clear()
  }

}

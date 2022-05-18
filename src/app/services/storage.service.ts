import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})export class StorageService {

  constructor() {}

  /**
   * -------------------------------------------------------
   * @summary setItemLocalStorage
   * @description  Almacena o actualiza valor de una variable en el localstorage
   * @param {string} key nombre de variable
   * @param {any} value Valor de la variable key
   * -------------------------------------------------------
   */
  public setItemLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  /**
   * -------------------------------------------------------
   * @summary getItemLocalStorage
   * @description  Obtiene valor de una variable en el localstorage
   * @param {string} key nombre de variable
   * -------------------------------------------------------
   */
  public getItemLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  /**
   * -------------------------------------------------------
   * @summary removeItemLocalStorage
   * @description  Elimina variable con sus valor  en el localstorage
   * @param {string} key nombre de variable
   * -------------------------------------------------------
   */
  public removeItemLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * -------------------------------------------------------
   * @summary clearLocalStorage
   * @description  Elimina el localstorage
   * -------------------------------------------------------
   */
  public clearLocalStorage() {
    localStorage.clear();
  }
}

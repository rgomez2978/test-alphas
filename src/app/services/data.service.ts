import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '@services/index';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  url!: string;
  language!: string;
  resp: any;

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  /**
   * -------------------------------------------------------
   * @summary httpOptions
   * @description  Opciones de cabeceras HTTP
   * -------------------------------------------------------
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  /**
   * -------------------------------------------------------
   * @summary getData
   * @description  Consumir data
   * @param {string} page lenguage
   * -------------------------------------------------------
   */
  getData(page: string) {
    this.url = `assets/JSON/${page}.json`;
    this._storageService.setItemLocalStorage('jsonLoad', true);
    return this._http.get<any>(this.url, this.httpOptions);
  }
}

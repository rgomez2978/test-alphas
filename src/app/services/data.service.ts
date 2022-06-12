import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '@services/index';
import { Data } from '@models/index';

/**
 * -------------------------------------------------------
 * @summary httpOptions
 * @description  Opciones de cabeceras HTTP
 * -------------------------------------------------------
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiURL = 'http://localhost:3000/data';
  url!: string;
  language!: string;
  resp: any;

  constructor(private _http: HttpClient) {}

  /**
   * -------------------------------------------------------
   * @summary getDataJSON
   * @description  Consumir data del JSON
   * -------------------------------------------------------
   */
  getDataJSON(): Observable<Data[]> {
    return this._http.get<Data[]>(this.apiURL);
  }

  /**
   * -------------------------------------------------------
   * @summary postDataJSON
   * @description Agregar un nuevo registro al JSON
   * @param {Data} item registro que se va a agregar
   * -------------------------------------------------------
   */
  postDataJSON(item: Data): Observable<Data> {
    // console.log('item', item)
    return this._http.post<Data>(this.apiURL, item, httpOptions);
  }

  // patch actualiza un atributo en especifo y su valor, cargar o enviar solo ese atributo

  // put actualiza todo el registro enviado , cargar o enviar el registro completo

  /**
   * -------------------------------------------------------
   * @summary putDataJSON
   * @description Actualiza data del JSON
   * @param {Data} item registro que se va a modificar
   * -------------------------------------------------------
   */
  putDataJSON(item: Data): Observable<Data> {
    const url = `${this.apiURL}/${item.id}`;
    return this._http.put<Data>(url, item, httpOptions);
  }

  /**
   * -------------------------------------------------------
   * @summary patchDataJSON
   * @description Actualiza data especifico del JSON
   * @param {Data} item registro que se va a modificar
   * -------------------------------------------------------
   */
  patchDataJSON(item: Data): Observable<Data> {
    const url = `${this.apiURL}/${item.id}`;
    return this._http.patch<Data>(url, item, httpOptions);
  }

  /**
   * -------------------------------------------------------
   * @summary deleteDataJSON
   * @description Elimina un registro del JSON
   * @param {Data} item registro que se va a eliminar
   * -------------------------------------------------------
   */
  deleteDataJSON(item: Data): Observable<Data> {
    const url = `${this.apiURL}/${item.id}`;
    return this._http.delete<Data>(url);
  }
}

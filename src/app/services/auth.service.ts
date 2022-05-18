import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { Users } from '@models/index';
import { StorageService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSubject: BehaviorSubject<Users>;
  authArray!: Users[];
  userAdmin!: Users[];
  data!: any;
  uuidValue: string;

  constructor(
    private _storageService: StorageService,
    private _router: Router
  ) {
    this.userSubject = new BehaviorSubject<Users>(
      JSON.parse(localStorage.getItem('login_dev')!)
    );
    this.authArray = [];
    this.userAdmin = [
      {
        fcn_id: this.generateUUID(),
        fcn_firstname: 'Ronald',
        fcn_lastname: 'Gomez',
        fcn_email: 'prueba01@gmail.com',
        fcn_password: 'prueba.01',
        fcn_logged: 'true',
        fcn_rememberme: 'true',
      },
    ];
  }

  /**
  * -------------------------------------------------------
  * @summary
  * @description
  * -------------------------------------------------------
  */
  generateUUID() {
    this.uuidValue = UUID.UUID();
    return this.uuidValue;
  }

  /**
   * -------------------------------------------------------
   * @summary userValidate
   * @description Getter observable que toma si existe una
   * session registrada en el Localstorage
   * -------------------------------------------------------
   */
  public get userValidate(): Users {
    return this.userSubject.value;
  }

  /**
   * -------------------------------------------------------
   * @summary addUser
   * @description Agrega la informacion de registro en el
   * Localstorage
   * -------------------------------------------------------
   */
  public addUser(item: Users): Observable<Users> {
    console.log('item', item);
    this.authArray.push(item);
    let listAuthArray: Users[] = [];
    if (localStorage.getItem('login_dev') == null) {
      listAuthArray.push(item);
      this.data = localStorage.setItem(
        'login_dev',
        JSON.stringify(listAuthArray)
      );
    } else {
      listAuthArray = JSON.parse(localStorage.getItem('login_dev')!);
      listAuthArray.push(item);
      this.data = localStorage.setItem(
        'login_dev',
        JSON.stringify(listAuthArray)
      );
    }
    return this.data;
  }

  /**
   * -------------------------------------------------------
   * @summary updateUser
   * @description actualiza la data de un usuario por
   * localstorage
   * -------------------------------------------------------
   */
  public updateUser(item: Users) {
    for (let i = 0; i < this.authArray.length; i++) {
      if (item == this.authArray[i]) {
      }
    }
  }

  /**
   * -------------------------------------------------------
   * @summary deleteAuth
   * @description Elimna un usario en especifico del
   * Localstorage
   * -------------------------------------------------------
   */
  public deleteUser(item: Users) {
    for (let i = 0; i < this.authArray.length; i++) {
      if (item == this.authArray[i]) {
        this.authArray.splice(i, 1);
        localStorage.setItem('login_dev', JSON.stringify(this.authArray));
      }
    }
  }

  /**
   * -------------------------------------------------------
   * @summary getUser
   * @description obtiene la data de un usuario especifico
   * Localstorage
   * -------------------------------------------------------
   */
  public getAllUser() {
    if (localStorage.getItem('login_dev') == null) {
      return this.authArray;
    } else {
      this.authArray = JSON.parse(localStorage.getItem('login_dev')!);
      return this.authArray;
    }
  }

  /**
   * -------------------------------------------------------
   * @summary filterUser
   * @description  filtra en el array o en el loclastorage
   * el usario logeado
   * @param {array} array - array del usuario
   * @param {string} email - email del usuario
   * @param {string} passw - password del usuario
   * -------------------------------------------------------
   */
  public filterUser(array: any, email: string, passw: string) {
    let resp = array
      .filter((x: any) => x.fcn_email === email)
      .filter((y: any) => y.fcn_password === passw);
    return resp.length === 0 ? false : true;
  }

  /**
   * -------------------------------------------------------
   * @summary getValidUser
   * @description obtiene los datos de acceso de un usaurio
   * en especifico desde el localstorage
   * @param {string} email - email del usuario
   * @param {string} passw - password del usuario
   * -------------------------------------------------------
   */
  public getValidUser(email: string, passw: string) {
    // PRoceso de logeo si es la primera ez y no hay data en el localstorage
    if (localStorage.getItem('login_dev') === null) {
      let initValue = this.filterUser(this.userAdmin, email, passw);
      initValue
        ? localStorage.setItem('login_dev', JSON.stringify(this.userAdmin))
        : null;
      return initValue;
    }
    // PRoceso de logeo si ya existe data en el localstorage
    else {
      console.log('CONTINUA CICLO');
      this.authArray = JSON.parse(localStorage.getItem('login_dev')!);
      let initValueLocalS = this.filterUser(this.authArray, email, passw);
      return initValueLocalS;
    }
  }

  /**
   * -------------------------------------------------------
   * @summary clearSession
   * @description Cierra sesion y borrar el localstorage
   * -------------------------------------------------------
   */
  clearSession() {
    localStorage.clear();
    this._storageService.setItemLocalStorage('showNavbar', false);
    this._storageService.setItemLocalStorage('showList', false);
    this._storageService.setItemLocalStorage('showAuth', true);
    this._router.navigate(['/signin'])
  }
}

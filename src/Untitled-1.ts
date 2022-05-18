import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { Users } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSubject: BehaviorSubject<Users>;
  authArray!: Users[];
  userAdmin!: Users[];
  data!: any;
  uuidValue: string;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<Users>(
      JSON.parse(localStorage.getItem('Login')!)
    );
    this.authArray = [];
    this.userAdmin = [
      {
        fcn_id: this.generateUUID(),
        fcn_firstname: 'Ronald',
        fcn_lastname: 'Gomez',
        fcn_email: 'prueba01@gmail.com',
        fcn_password: 'prueba.01',
        fcn_logged: 'false',
        fcn_rememberme: 'false',
      },
    ];
  }

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
    if (localStorage.getItem('Login') == null) {
      listAuthArray.push(item);
      this.data = localStorage.setItem('Login', JSON.stringify(listAuthArray));
    } else {
      listAuthArray = JSON.parse(localStorage.getItem('Login')!);
      listAuthArray.push(item);
      this.data = localStorage.setItem('Login', JSON.stringify(listAuthArray));
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
        localStorage.setItem('Login', JSON.stringify(this.authArray));
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
    if (localStorage.getItem('Login') == null) {
      return this.authArray;
    } else {
      this.authArray = JSON.parse(localStorage.getItem('Login')!);
      return this.authArray;
    }
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
    console.log('email', email);
    console.log('passw', passw);

    if (localStorage.getItem('Login') === null) {
      console.log('error NULL');
      // let validArray = this.userAdmin
      //   .filter((i) => i.fcn_email === email)
      //   .filter((j) => j.fcn_password === passw);

      // console.log('validArray', validArray);
      // console.log('this.userAdmin', this.userAdmin);

      // if (validArray.length === 0) {
      //   localStorage.setItem('Login', JSON.stringify(this.userAdmin));
      // }
      // return this.userAdmin;
    } else {
        console.log('CONTINUA CICLO');

      // console.log('valid.length', valid.length)
      // if (valid.length === 0) {
      // //   // si no esta en el localstorage busca dentro del arary prestablecido
      //   let validArray = this.userAdmin
      //     .filter((i) => i.fcn_email === email)
      //     .filter((j) => j.fcn_password === passw);

      //   console.log('validArray', validArray)
      // //   // if (validArray.length !== 0) {
      // //   //   console.log('validArray', validArray)
      // //   //   localStorage.setItem('Login', JSON.stringify(validArray))
      // //   // }
      //   return validArray.length === 0 ? false : true;
      // } else {
      //   return valid.length === 0 ? false : true;
      // }
    }
    return this.authArray;
  }
}

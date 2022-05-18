import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService, StorageService, DataService } from '@services/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private _dataService:DataService,
    private _titleService:Title
  ) {}

  /**
   * -------------------------------------------------------
   * @summary ngOnInit
   * @description  Inicializa funciones al cargar el
   * -------------------------------------------------------
   */
   ngOnInit() {
     this._titleService.setTitle('Smart Suite Tools');
     this.getDataAPI('user');
   }



    /**
   * -------------------------------------------------------
   * @summary getData
   * @description Retorna la data layout - menu y footer
   * @param {string} page pagina de json a cargar
   * -------------------------------------------------------
   */
  getDataAPI(page: string) {
    this._dataService.getData(page);
      // if (!this.apiConHome) {
      //   this._apiJSONService.getJSON(lang, 'home', true).subscribe(
      //     (resp: any) => {
      //       this.data = resp;
      //       if (this.data !== undefined) {
      //         this._reduxService.setArray('home', this.data, lang);
      //         this.getDataArray(this.fullData);
      //       }
      //     },
      //     (error: any) => console.log(`error`, error),
      //     () => { }
      //   );
      // }
      // else {
      //   this.getDataArray(this.fullData);
      // }
    }



  /**
   * -------------------------------------------------------
   * @summary getDataArray
   * @description Obtiene la data del arreglo almacenado en el state
   *  y asigna posicion de arreglo en data
   * @param {any} array arraglo a buscar
   * -------------------------------------------------------
   */
   getDataArray(array: any) {
    // if (Object.keys(array).length > 0) {
    //   this.data = array;
    //   this.dataHeader = this.data.header;
    //   this.dataClients = this.data.clients;
    //   this.dataNews = this.data.news;
    //   return this.data;
    // }
  }

}

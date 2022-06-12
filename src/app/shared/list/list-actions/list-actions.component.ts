import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@services/index';
import { Data } from '@models/data.interface';

@Component({
  selector: 'app-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.scss'],
})
export class ListActionsComponent implements OnInit {
  @Input() item: any;
  @Output() onDeleteData: EventEmitter<Data> = new EventEmitter();
  @Output() onChangeStatus: EventEmitter<Data> = new EventEmitter();
  @Output() onViewData: EventEmitter<Data> = new EventEmitter();
  @Output() onEditData: EventEmitter<Data> = new EventEmitter();
  data: any;


  constructor(
    private _authService: AuthService,
  ) {}


  ngOnInit(): void {
  }

  /**
  * -------------------------------------------------------
  * @summary onShowView
  * @description llama la funcion ver la data
  * -------------------------------------------------------
  */
  onShowView(item: any) {
    this.onViewData.emit(item);
  }

  /**
  * -------------------------------------------------------
  * @summary onShowEdit
  * @description llama la funcion para editar la data
  * -------------------------------------------------------
  */
  onShowEdit(item: any) {
    this.onEditData.emit(item);
  }

  /**
   * -------------------------------------------------------
   * @summary onDelete
   * @description llama la funcion deleleData en el componente padre
   * @param {interface} item item a eliminar
   * -------------------------------------------------------
   */
  onDelete(item: any) {
    this.onDeleteData.emit(item);
  }




}

import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService, FormService, DataService } from '@services/index';
import { Data } from '@models/data.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public form_edit!: FormGroup;
  data: Data[] = [];
  dataSelected: any = [];
  viewSelected: any = [];
  submitted: boolean;
  editData: boolean;
  showModal: boolean = true;
  @ViewChild('clickCloseModal') element: ElementRef;

  constructor(
    private _FB: FormBuilder,
    private _formService: FormService,
    private _dataService: DataService,
    private _titleService: Title,
    private _renderer2: Renderer2
  ) { }

  /**
   * -------------------------------------------------------
   * @summary ngOnInit
   * @description  Inicializa funciones al cargar el
   * -------------------------------------------------------
   */
  ngOnInit() {
    this._titleService.setTitle('Test Alphas Technology');
    this.getData();
    this.initForm();
  }

  /**
   * -------------------------------------------------------
   * @summary initForm
   * @description Inicializa el Formulario reactivo
   * -------------------------------------------------------
   */
  initForm() {
    this.form_edit = this._FB.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: ['', [Validators.required]],
      logged: [false, []],
      id: ['', []],
      status: [true, []],
      rememberme: [false, []],
    });
  }

  /**
   * -------------------------------------------------------
   * @summary getData
   * @description Retorna la data de la lista
   * -------------------------------------------------------
   */
  getData() {
    this._dataService.getDataJSON().subscribe(
      (resp) => {
        this.data = resp;
      },
      (error: any) => console.log(`error`, error),
      () => { }
    );
  }

  /**
   * -------------------------------------------------------
   * @summary getEditData
   * @description obtien y carga en el formulario la data qu se desea editar
   * @param {interface} item item a editar
   * -------------------------------------------------------
   */
  getEditData(item: Data) {
    this.dataSelected = item;
    this.editData = true;
    let valiData = Object.keys(this.dataSelected);
    this.form_edit.reset({
      name: valiData.length > 0 ? this.dataSelected.name : '',
      username:
        this.dataSelected.username !== undefined
          ? this.dataSelected.username
          : '',
      email:
        this.dataSelected.email !== undefined ? this.dataSelected.email : '',
      phone:
        this.dataSelected.phone !== undefined ? this.dataSelected.phone : '',
      id: this.dataSelected.id !== undefined ? this.dataSelected.id : false,
      logged:
        this.dataSelected.logged !== undefined
          ? this.dataSelected.logged
          : false,
      rememberme:
        this.dataSelected.rememberme !== undefined
          ? this.dataSelected.rememberme
          : false,
      status:
        this.dataSelected.status !== undefined
          ? this.dataSelected.status
          : true,
    });
  }

  /**
   * -------------------------------------------------------
   * @summary getViewData
   * @description obtien y carga la data qu se desea consultar
   * @param {interface} item item a editar
   * -------------------------------------------------------
   */
  getViewData(item: Data) {
    this.viewSelected = item;
    console.log(' this.viewSelected', this.viewSelected);
  }

  /**
   * -------------------------------------------------------
   * @summary changeStatus
   * @description cambia el status del registro
   * -------------------------------------------------------
   */
  changeStatus() {
    console.log('change status padre');
  }

  /**
   * -------------------------------------------------------
   * @summary deleleData
   * @description Eliman el item seleccionado del JSON
   * @param {interface} item item a eliminar
   * -------------------------------------------------------
   */
  deleleData(item: Data) {
    Swal.fire({
      title: 'Are you sure to delete this item?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deleted item!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._dataService.deleteDataJSON(item).subscribe(() => {
          this.data = this.data.filter((x) => x.id !== item.id);
        });
      }
    });
  }

  /**
   * -------------------------------------------------------
   * @summary onSubmit
   * @description Envio y validaccion de formulario al
   * localstorage
   * -------------------------------------------------------
   */
  onSubmit() {
    this._formService.validateForm(this.form_edit);
    if (this.form_edit.status == 'VALID') {
      console.log('valid');
      this.submitted = true;
      this.form_edit.disable();
      this._dataService.putDataJSON(this.form_edit.value).subscribe();
      this.form_edit.enable();
      this.form_edit.reset();
      this.element.nativeElement.click();// triger clcik
    }
  }
}

import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  /**
   * -------------------------------------------------------
   * @summary validateForm
   * @description Valida si el formulario es invalido
   * -------------------------------------------------------
   */
  validateForm(fgroup: FormGroup) {
    if (fgroup.invalid) {
      return Object.values(fgroup.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
  }

  /**
   * -------------------------------------------------------
   * @summary invalidValue
   * @description Retorna si se ha hecho touch  o si el
   * estatus es invalid en un formControlName
   * @param {FormGroup} fgroup - formControlName
   * @param {string} fcname - formControlName
   * -------------------------------------------------------
   */
  invalidValue(fgroup: FormGroup, fcname: string) {
    return fgroup.get(fcname)?.invalid && fgroup.get(fcname)?.touched;
  }

  /**
   * -------------------------------------------------------
   * @summary getLength
   * @description obtiene el lenght de un campo
   * @param {string} fcname - formControlName
   * @param {FormGroup} fgroup - formControlName
   * -------------------------------------------------------
   */
  getLengthFieldForm(fgroup: FormGroup, fcname: string) {
    return fgroup.get(fcname)?.value?.length;
  }
}

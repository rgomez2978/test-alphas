import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '@services/form.service';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() fcn!: string;
  @Input() min!: number;
  @Input() max!: number;
  @Input() msj!: string;
  @Input() type!: string;

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  /**
   * -------------------------------------------------------
   * @summary getLength
   * @description obtiene el lenght
   * @param {string} fcname - formControlName
   * @param {FormGroup} fgroup - formControlName
   * -------------------------------------------------------
   */
  getLength(fgroup: FormGroup, fcname: string) {
    return this.formService.getLengthFieldForm(fgroup, fcname);
  }


  /**
   * -------------------------------------------------------
   * @summary invalidValue
   * @description Retorna si se ha hecho touch  o si el estatus es invalid en un formControlName
   * @param {FormGroup} fgroup - formControlName
   * @param {string} fcname - formControlName
   * -------------------------------------------------------
   */
  invalidValue(fgroup: FormGroup, fcname: string) {
    return this.formService.invalidValue(fgroup, fcname);
  }
}

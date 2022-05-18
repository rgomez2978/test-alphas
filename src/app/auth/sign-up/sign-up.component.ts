import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, FormService } from '@services/index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.style.scss', './sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public form!: FormGroup;
  loading = false;
  submitted = true;

  constructor(
    private FB: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private formService: FormService
  ) {}

  /**
   * -------------------------------------------------------
   * @summary ngOnInit
   * @description Inicializa las funciones o metodos de precarga
   * -------------------------------------------------------
   */
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * -------------------------------------------------------
   * @summary initForm
   * @description Inicializa el Formulario reactivo
   * -------------------------------------------------------
   */
  initForm() {
    this.form = this.FB.group({
      fcn_firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
      fcn_lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
      fcn_email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      fcn_password: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]{8,15}$')],
      ],
      fcn_logged: ['false', []],
      fcn_id: [this.authService.generateUUID(), []],
      fcn_rememberme: ['false', []],
    });
  }

  /**
   * -------------------------------------------------------
   * @summary validateForm
   * @description Valida si el formulario es invalido
   * @param {FormGroup} fgroup - formGrop
   * -------------------------------------------------------
   */
  validateForm(fgroup: FormGroup) {
    this.formService.validateForm(fgroup);
  }

  /**
   * -------------------------------------------------------
   * @summary onSubmit
   * @description Envio y validaccion de formulario al
   * localstorage
   * -------------------------------------------------------
   */
  onSubmit() {

    this.validateForm(this.form);
    if (this.form.status == 'VALID') {
      this.submitted = false;
      this.form.disable();
      this.authService.addUser(this.form.value); // save on localstorage
      Swal.fire({
        title: 'Are you sure to register the user?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, registered user!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Registered',
            text: 'Your user has been save it.',
            icon: 'success',
            timer: 1500,
          });
          this.submitted = true;
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 1500);
        } else {
          this.submitted = true;
          this.form.enable();
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, FormService, StorageService } from '@services/index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth.style.scss', './sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public form!: FormGroup;
  loading = false;
  submitted = true;
  showpasswd = true;
  typePasswd = 'password';
  rememberme = false;

  constructor(
    private FB: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formService: FormService,
    private storageService: StorageService
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
      fcn_email: [
        'prueba01@gmail.com',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      fcn_password: [
        'prueba.01',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]{8,15}$')],
      ],
      fcn_rememberme: [this.rememberme, []],
    });
  }

  /**
   * -------------------------------------------------------
   * @summary showPassword
   * @description Muestra y oculta el password
   * -------------------------------------------------------
   */
  showPassword() {
    this.showpasswd = !this.showpasswd;
    this.typePasswd = this.showpasswd ? 'password' : 'text';
  }

  /**
   * -------------------------------------------------------
   * @summary validateForm
   * @description Valida si el formulario es invalido
   * -------------------------------------------------------
   */
  validateForm() {
    this.formService.validateForm(this.form);
  }

  /**
   * -------------------------------------------------------
   * @summary onSubmit
   * @description Envio y validaccion de formulario al
   * localstorage
   * -------------------------------------------------------
   */
  onSubmit() {
    let email = this.form.controls.fcn_email.value || '';
    let password = this.form.controls.fcn_password.value || '';

    this.validateForm();
    if (this.form.status == 'VALID') {
      let userValid = this.authService.getValidUser(email, password);
      if (!userValid) {
        Swal.fire(
          'Invalid Access',
          'User or password invalid, please try again',
          'error'
        );
        this.form.reset();
        this.storageService.setItemLocalStorage('showNavbar', false);
        this.storageService.setItemLocalStorage('showList', false);
        this.storageService.setItemLocalStorage('showAuth', true);
      } else {
        Swal.fire({
          title: 'Access Granted',
          text: 'Valid user,  welcome to the app.',
          icon: 'success',
          timer: 1500,
        });
        setTimeout(() => {
          this.storageService.setItemLocalStorage('showNavbar', true);
          this.storageService.setItemLocalStorage('showList',true);
          this.storageService.setItemLocalStorage('showAuth', false);
          this.router.navigate(['/home']);
        }, 1500);
      }
    }
  }
}

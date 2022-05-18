import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, StorageService } from '@services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'test-alphas';
  showNavbar: boolean = false;
  showList: boolean = false;
  showAuth: boolean = true;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _storageService: StorageService,
    private cd: ChangeDetectorRef
  ) {

  }


  ngOnInit(): void {
    let logged = JSON.parse(localStorage.getItem('login_dev') || '{}');
    let finalValue = this._authService.userValidate ? true : null;
    if (finalValue && logged[0].fcn_logged === 'true') {
      this._storageService.setItemLocalStorage('showNavbar', true);
      this._storageService.setItemLocalStorage('showList', true);
      this._storageService.setItemLocalStorage('showAuth', false);
      this._router.navigate(['/home']);
    } else {
      this._storageService.setItemLocalStorage('showNavbar', false);
      this._storageService.setItemLocalStorage('showList', false);
      this._storageService.setItemLocalStorage('showAuth', true);
      this._router.navigate(['/signin']);
    }
  }

  ngAfterViewChecked(): void {
    this.showList = JSON.parse(localStorage.getItem('showList') || '{}');
    this.showNavbar = JSON.parse(localStorage.getItem('showNavbar') || '{}');
    this.showAuth = JSON.parse(localStorage.getItem('showAuth') || '{}');
    this.cd.detectChanges(); // detecta cambios en la vista
  }
}

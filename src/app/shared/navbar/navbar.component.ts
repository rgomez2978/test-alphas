import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, StorageService } from '@services/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../app.component.scss', './navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  /**
   * -------------------------------------------------------
   * @summary logout
   * @description  Llama el servicio de auth para cerrar sesion
   * -------------------------------------------------------
   */
  logout() {
    this.authService.clearSession();
  }
}

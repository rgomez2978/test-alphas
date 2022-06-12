import { Component, OnInit,AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  showList: boolean = false;
  showNavbar: boolean = false;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.showList = JSON.parse(localStorage.getItem('showList') || '{}');
    this.showNavbar = JSON.parse(localStorage.getItem('showNavbar') || '{}');
  }

  ngAfterViewChecked(): void {
    this.showList = JSON.parse(localStorage.getItem('showList') || '{}');
    this.showNavbar = JSON.parse(localStorage.getItem('showNavbar') || '{}');
    this.cd.detectChanges(); // detecta cambios en la vista
  }





}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '@pages/home/home.component';
import { ListComponent } from '@shared/list/list.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListComponent
  ]
})
export class PagesModule { }

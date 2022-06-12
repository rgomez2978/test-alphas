import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '@pages/home/home.component';
import { SharedModule } from '@shared/shared.module';
// import { ListComponent } from '@shared/list/list.component';
// import { ListActionsComponent } from '@shared/list/list-actions/list-actions.component';


@NgModule({
  declarations: [
    HomeComponent,
    // ListComponent,
    // ListActionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    // ListComponent,
    // ListActionsComponent,
  ]
})
export class PagesModule { }

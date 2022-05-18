import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ListComponent } from '@shared/list/list.component';
import { LoadingComponent } from '@shared/loading/loading.component';
import { FormErrorComponent } from '@shared/form-error/form-error.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';

@NgModule({
  declarations: [
    // ListComponent,
    LoadingComponent,
    FormErrorComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // ListComponent,
    LoadingComponent,
    FormErrorComponent,
    NavbarComponent
  ]
})
export class SharedModule { }

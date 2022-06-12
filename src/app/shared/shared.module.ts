import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '@shared/loading/loading.component';
import { FormErrorComponent } from '@shared/form-error/form-error.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { ListComponent } from '@shared/list/list.component';
import { ListActionsComponent } from './list/list-actions/list-actions.component';

@NgModule({
  declarations: [
    LoadingComponent,
    FormErrorComponent,
    NavbarComponent,
    ListComponent,
    ListActionsComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    LoadingComponent,
    FormErrorComponent,
    NavbarComponent,
    ListComponent,
    ListActionsComponent,
  ],
})
export class SharedModule {}

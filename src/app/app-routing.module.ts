import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';

// COMPONENTS
import { HomeComponent } from '@pages/home/home.component';
import { SignInComponent } from '@auth/sign-in/sign-in.component';
import { SignUpComponent } from '@auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '**', redirectTo: '/home', pathMatch:'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

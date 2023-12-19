import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routingConfig } from './RoutingConfig';
import { GenericScreenComponent } from './generic-screen/generic-screen.component';
import { LoginComponent } from './login/login.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

// const routes: Routes = routingConfig
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: GenericScreenComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'verify-otp',
    component: VerifyOtpComponent
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

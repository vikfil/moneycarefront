import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ConfirmComponent } from './component/confir-account/confirm-component';
import { HeaderComponent } from './component/header/header-component';
import { HomeComponent } from './component/home-component';
import { LoginComponent } from './component/login/login-component';
import {RegisterComponent} from './component/registration/registration-component';
import { AuthGuardService } from './service/auth-guard-service';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'confirm', component: ConfirmComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

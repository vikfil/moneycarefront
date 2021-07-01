import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './service/user-service';
import { AuthenticationService } from './service/authenticated-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginComponent } from './component/login/login-component';
import { RegisterComponent } from './component/registration/registration-component';
import { ConfirmComponent } from './component/confir-account/confirm-component';
import { HeaderComponent } from './component/header/header-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IncomeService } from './service/income-service';
import { HomeComponent } from './component/home-component';
import { AuthInterceptor } from './service/auth-interceptor';
import { BasicInterceptorService } from './service/basic-interceptor-service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot({
    //   timeOut: 10000,
    //   positionClass: 'toast-top-center',
    //   enableHtml: true
    // }),
  ],
  providers: [
   // UserService,
    {provide: HTTP_INTERCEPTORS, useClass: BasicInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    //  IncomeService, 
    //  AuthenticationService
    // ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

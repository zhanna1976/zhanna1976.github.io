import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticationService } from './services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { PasswordInputComponent } from './password-input/password-input.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, PasswordInputComponent],
  imports: [
    HttpClientModule,
    MaterialModule,
    RouterModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}

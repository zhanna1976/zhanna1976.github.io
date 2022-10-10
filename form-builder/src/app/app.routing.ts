import { Routes, RouterModule } from '@angular/router';
import { BuilderComponent } from './components/builder/builder.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: BuilderComponent, canActivate: [AuthGuardService] },
  { path: 'log-in', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: '' },
];

export const appRoutingModule = RouterModule.forRoot(routes);

import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (!this.authService.getToken()) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }
}

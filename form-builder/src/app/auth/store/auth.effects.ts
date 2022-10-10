import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, switchMap, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import {
  lohInFailure,
  lohInSuccess,
  setUser,
  setUserWithToken,
} from './user/user.actions';
import { User } from '../models/user';

@Injectable()
export class AuthEffects {
  checkStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUser),
      map((action: User) => action),
      switchMap(action => {
        return this.authService.logIn(action.email!, action.password!).pipe(
          map(() => {
            return lohInSuccess();
          }),
          catchError(() => {
            return of(lohInFailure());
          })
        );
      })
    )
  );

  checkStatusWithToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUserWithToken),
      map((action: User) => action),
      switchMap(() => {
        return this.authService.logInWithToken().pipe(
          map(() => {
            return lohInSuccess();
          }),
          catchError(() => {
            return of(lohInFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService
  ) {}
}

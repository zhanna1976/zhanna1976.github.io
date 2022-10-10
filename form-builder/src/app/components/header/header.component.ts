import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { User } from '../../auth/models/user';
import { getUser, getUsers } from '../../auth/store/user/user.selector';
import {
  removeUser,
  setUserWithToken,
} from '../../auth/store/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public userName$: Observable<string> = this.store$.pipe(
    select(getUser),
    takeUntil(this.destroy$)
  );

  constructor(
    private authService: AuthenticationService,
    private store$: Store<User>
  ) {}

  logOut() {
    this.authService.logout();
    this.store$.dispatch(removeUser());
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authService
        .logInWithToken()
        .pipe(takeUntil(this.destroy$))
        .subscribe(user => {
          if (user) {
            this.store$.dispatch(setUserWithToken({ ...user }));
            this.store$
              .pipe(select(getUsers))
              .subscribe(item => console.log(item));
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

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
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {}
}

import { Injectable } from '@angular/core';
import { concatMap, filter, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  getToken(): any {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/users').pipe(
      map(users => {
        return users.find((user: User) => {
          return user.email === email && user.password === password;
        });
      }),
      tap(user => {
        if (user) {
          localStorage.setItem('token', user.token!);
        }
      })
    );
  }

  logInWithToken(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/users').pipe(
      concatMap((users: User[]) => users),
      filter(user => user.token === localStorage.getItem('token'))
    );
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/log-in']);
  }
}

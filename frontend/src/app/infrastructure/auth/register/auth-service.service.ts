import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { User } from 'src/app/feature-moduls/model/User';
import { Register } from 'src/app/feature-moduls/model/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userClaims: any = null;

  decodeToken(): any {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.decodeToken(token) : null;
  }
  private loginStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  loginStatus$ = this.loginStatus.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  signUp(user: Register): Observable<Register> {
    return this.http.post<Register>(
      'http://localhost:8081/api/auth/register',
      user
    );
  }

  login(loginRequest: Credential): Observable<boolean> {
    return this.http
      .post<any>('http://localhost:8081/api/auth/login', loginRequest)
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.accessToken);
          this.loginStatus.next(this.isAuthenticated());
          return true;
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.loginStatus.next(false);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getUserId(): string {
    const token = localStorage.getItem('token');
    this.userClaims = this.decodeToken();
    return this.userClaims.id;
  }
}

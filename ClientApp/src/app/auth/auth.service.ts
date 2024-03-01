import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginInfoPayload } from '../login/login-info-payload';
import { AppConfigService } from '../app-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  get route() {
    let baseUrl = AppConfigService.appConfig ? AppConfigService.appConfig.api.url : 'https://localhost:7258';
    return `${baseUrl}/api/user-account/`;
  }

  login(login: LoginInfoPayload): Observable<any> {
    const url = this.route + 'login';
    return this.http.post<any>(url, login);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
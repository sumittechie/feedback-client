import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserInfo } from '../shared/models/i-user-info';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginApi = `${environment.api}/auth/login`;

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router,
    private readonly _loader: NgxSpinnerService
  ) {}

  login(param: IUserInfo): Observable<any> {
    return this._http.post(this.loginApi, param);
  }

  logout(): void {
    this._loader.hide();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this._router.navigate(['/login']);
  }
}

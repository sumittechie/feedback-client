import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../shared/models/i-api-response';
import { IUserInfo } from '../shared/models/i-user-info';


@Injectable({
  providedIn: 'root'
})
export class LoginService  {

  loginApi = `${environment.api}/auth/login`

  constructor(private readonly _http: HttpClient, private readonly _router: Router ) { }

  login(param: IUserInfo): Observable<any> {
     return this._http.post(this.loginApi,param);
  }

  logout(): void {
    localStorage.removeItem('user-info');
    this._router.navigate(['/login']);
  }
}

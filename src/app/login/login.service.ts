import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUserInfo } from '../shared/models/i-user-info';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginApi = `${environment.api}/auth/`;

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router,
    private readonly _loader: NgxSpinnerService
  ) {}

  login(param: IUserInfo): Observable<any> {
    return this._http.post(`${this.loginApi}login`, param);
  }

  logout(): void {
    this._loader.show();
    this._http.post(`${this.loginApi}logout`, null).pipe(take(1)).subscribe((response: any) => {
         if(response && response.message === 'Logged Out' ) {
            this._loader.hide();
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('name');
            localStorage.removeItem('photo');
            this._router.navigate(['/login']);
         }
    });
  }
}

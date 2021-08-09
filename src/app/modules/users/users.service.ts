import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse, IUsers, IUserSave } from 'src/app/shared/models';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  api = `${environment.api}/user`;

  constructor(private readonly _http: HttpClient) {}

  getDropdownUsers(): Observable<IApiResponse> {
    return this._http
      .get(`${this.api}/dropdown`)
      .pipe(map((response: any) => response));
  }

  getAll(): Observable<IApiResponse> {
    return this._http.get(`${this.api}`).pipe(map((response: any) => response));
  }

  post(userObj: IUserSave): Observable<IApiResponse> {
    return this._http
      .post(this.api, userObj)
      .pipe(map((response: any) => response));
  }
}

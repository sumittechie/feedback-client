import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from 'src/app/shared/models';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  api = `${environment.api}/user`;

  constructor(private readonly _http: HttpClient) {}

  getUsers(): Observable<IApiResponse> {
    return this._http.get(this.api).pipe(map((response: any) => response));
  }
}

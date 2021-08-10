import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from 'src/app/shared/models/i-api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepliesService {
  api = `${environment.api}/reply/`;

  constructor(private readonly _http: HttpClient) {}

  getAll(id: number): Observable<IApiResponse> {
    return this._http.get(`${this.api}${id}`).pipe(map((response: any) => response));
  }


}

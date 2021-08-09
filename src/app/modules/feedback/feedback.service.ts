import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  api = `${environment.api}/reply/`;

  constructor(private readonly _http: HttpClient) {}

  get(): Observable<IApiResponse> {
    return this._http.get(this.api).pipe(map((response: any) => response));
  }

  post(reply: string, id: number): Observable<IApiResponse> {
    const data = { id, reply };
    return this._http
      .post(this.api, data)
      .pipe(map((response: any) => response));
  }
}

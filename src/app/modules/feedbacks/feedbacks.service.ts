import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from 'src/app/shared/models/i-api-response';
import { IFeedbackSave } from 'src/app/shared/models/i-feedback-save';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksService {
  api = `${environment.api}/feedback/`;

  constructor(private readonly _http: HttpClient) {}

  getAll(): Observable<IApiResponse> {
    return this._http.get(this.api).pipe(map((response: any) => response));
  }

  get(id: number): Observable<IApiResponse> {
    return this._http
      .get(`${this.api}${id}`)
      .pipe(map((response: any) => response));
  }

  delete(id: number): Observable<IApiResponse> {
    return this._http
      .delete(`${this.api}${id}`)
      .pipe(map((response: any) => response));
  }

  saveFeedbacks(param: IFeedbackSave): Observable<IApiResponse> {
    return this._http
      .post(`${this.api}savefeedback`, param)
      .pipe(map((response: any) => response));
  }
}

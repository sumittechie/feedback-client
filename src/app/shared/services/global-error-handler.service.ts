import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {


  constructor(private readonly _loginService: LoginService) {
    super();
  }
  
  handlError(response: HttpErrorResponse | any): Observable<any> | any {
    if (response instanceof HttpErrorResponse) {
      if (response.status === 401) {
        this._loginService.logout();
      }
      if( response.status === 404) {
        return of(response.error.message);
      }
    }
  }
}

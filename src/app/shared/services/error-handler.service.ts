import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler extends ErrorHandler {
  constructor(private readonly _loginService: LoginService) {
    super();
  }

  handlError(response: HttpErrorResponse | any): Observable<any> | any {
    console.log('Error', response);
  }
}

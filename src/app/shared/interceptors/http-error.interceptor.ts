import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';
import { LoginService } from 'src/app/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly _logger: LoggerService,
    private readonly _loginService: LoginService,
    private readonly _loader: NgxSpinnerService,
    private readonly _router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this._loader.hide();
          // check for internet connection
          if (!navigator.onLine) {
            this._logger.error('No internet connection');
          }

          if(error.status === 0) {
            this._logger.error('Web API server is unavailable.');
            this._loginService.logout();
          }

          //Handle Http Error Status
          if (error.status === 401) {
            this._loginService.logout();
          }

          if(error.status === 403) {
            this._router.navigate(['/unauthorized']);
          }
        }
        // need to rethrow so angular can catch the error
        return throwError(error);
      })
    );
  }
}

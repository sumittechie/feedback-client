import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserInfo } from '../shared/models/i-user-info';
import { LoginService } from './login.service';
import { take } from 'rxjs/operators';
import { IApiResponse } from '../shared/models/i-api-response';
import { LoggerService } from '../shared/services/logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _service: LoginService,
    private readonly _logger: LoggerService,
    private readonly _router: Router
  ) {}

  private initForm(): void {
    this.loginForm = this._fb.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    const userInfo: IUserInfo = {
      email: this.username?.value,
      password: this.password?.value,
    };

    this._service
      .login(userInfo)
      .pipe(take(1))
      .subscribe((response: IApiResponse) => {
        if (!response.error) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('photo', response.data.photo);
          this._router.navigate(['']);
        } else {
          this._logger.error(response.message);
        }
      });
  }
}

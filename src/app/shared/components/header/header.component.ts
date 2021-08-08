import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'fb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;

  constructor(private readonly _loginService: LoginService) {}

  ngOnInit(): void {}

  onLogout(): void {
    this._loginService.logout();
  }
}

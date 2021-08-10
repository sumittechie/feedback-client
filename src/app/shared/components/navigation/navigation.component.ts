import { Component, Input, OnInit } from '@angular/core';
import {
  animateText,
  onSideNavChange,
} from '../../animations/navigations.animations';
import { IPage } from '../../models/i-page';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'fb-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [onSideNavChange, animateText],
})
export class NavigationComponent implements OnInit {
  public sideNavState: boolean = true;
  public linkText: boolean = true;
  public pages: IPage[] = [
    { name: 'Home', link: '', icon: 'home' },
    { name: 'Feeback', link: '/feedbacks', icon: 'assignments' },
  ];
  role: string | null = null;
  name: string | null = null;
  photo: string | null = null;

  constructor(private _sidenavService: NavigationService) {
    if (localStorage) {
      this.role = localStorage.getItem('role');
      this.name = localStorage.getItem('name');
      this.photo = localStorage.getItem('photo');
    }
  }

  ngOnInit() {
    if (this.role !== null && this.role === 'admin') {
      this.pages.push({
        name: 'Users',
        link: '/users',
        icon: 'manage_accounts',
      });
    }
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }
}

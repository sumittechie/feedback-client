import { Component, OnInit } from '@angular/core';
import { animateText, onSideNavChange } from '../../animations/navigations.animations';
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
    { name: 'Users', link: '/orders', icon: 'manage_accounts' },
    { name: 'Feeback', link: '/sells', icon: 'assignments' },
    { name: 'Manufacturers', link: '/manufactures', icon: 'apartment' },
  ];

  constructor(private _sidenavService: NavigationService) {}

  ngOnInit() {}

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }
}
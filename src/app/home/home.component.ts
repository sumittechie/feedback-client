import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from '../shared/animations/navigations.animations';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'fb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [onMainContentChange],
})
export class HomeComponent implements OnInit {
  onSideNavChange = false;

  constructor(private readonly _sidenavService: NavigationService) {
    this._sidenavService.sideNavState$.subscribe((res) => {
      console.log(res);
      this.onSideNavChange = res;
    });
  }

  ngOnInit(): void {}
}

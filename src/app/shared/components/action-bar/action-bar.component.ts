import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fb-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent {
  @Input() title?: string;
  @Output('onCreate') create: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  onCreate(): void {
    this.create.emit();
  }
}

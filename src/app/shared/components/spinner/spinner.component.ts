import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fb-spinner',
  template: `
    <ngx-spinner
      bdColor="rgba(51,51,51,0.8)"
      size="medium"
      color="#ff0033"
      type="ball-scale-multiple"
    >
      <p style="font-size: 14px; color: white">Loading...</p>
    </ngx-spinner>
  `,
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: '[sui-divider]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.divider': `true`
  }
})
export class SuiDividerComponent {
  constructor() {
  }
}

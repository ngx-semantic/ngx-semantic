import {Component} from '@angular/core';

@Component({
  selector: 'sui-icon',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.icon]': `true`
  }
})
export class SuiIconComponent {
  constructor() {
  }
}

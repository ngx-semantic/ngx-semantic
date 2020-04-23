import {Component} from '@angular/core';

@Component({
  selector: '[sui-flag]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.flag]': `true`
  }
})
export class SuiFlagComponent {
  constructor() {
  }
}

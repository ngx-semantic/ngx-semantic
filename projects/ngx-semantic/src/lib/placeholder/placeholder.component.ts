/**
 * Created by bolor on 5/6/2020
 */

import {Component} from '@angular/core';

@Component({
  selector: '[sui-placeholder]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.placeholder]': `true`
  }
})
export class SuiPlaceholderComponent {
}

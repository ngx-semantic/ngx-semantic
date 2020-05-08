/**
 * Created by bolor on 5/8/2020
 */

import {Component} from '@angular/core';

@Component({
  selector: '[sui-placeholder-line]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.line]': `true`
  }
})
export class SuiPlaceholderLineComponent {
}

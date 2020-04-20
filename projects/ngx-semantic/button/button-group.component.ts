/**
 * Created by bolor on 4/20/2020
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: '[sui-button-group]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.buttons]': `true`,
    '[class.icon]': `suiIcon`
  }
})
export class SuiButtonGroupComponent {
  @Input() suiIcon = false;
}

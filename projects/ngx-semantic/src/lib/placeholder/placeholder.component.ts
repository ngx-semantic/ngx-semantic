/**
 * Created by bolor on 5/6/2020
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: '[sui-placeholder]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.fluid]': `suiFluid`,
    '[class.active]': `suiActive`,
    '[class.inverted]': `suiInverted`,
    '[class.placeholder]': `true`
  }
})
export class SuiPlaceholderComponent {
  @Input() suiActive = false;
  @Input() suiInverted = false;
  @Input() suiFluid = false;
}
